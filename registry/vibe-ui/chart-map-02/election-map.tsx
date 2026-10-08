import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
// SVG has no native button element; its state groups supply button semantics.
/* eslint-disable jsx-a11y/prefer-tag-over-role, jsx-a11y/no-noninteractive-element-interactions */

import { ElectionResultCard } from "./election-result-card";
import type { DerivedMapData, MapRegion } from "./map-model";

export type ElectionMapProps = {
  data: DerivedMapData;
  shownRegion: MapRegion | null;
  activeRegion: MapRegion | null;
  cardId: string;
  className?: string;
  onPreview: (code: string | null) => void;
  onActivate: (code: string) => void;
  onClear: () => void;
};

type MapViewport = {
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};
type MapAnchor = { x: number; y: number };

function pointerAnchor(event: PointerEvent | MouseEvent, container: HTMLDivElement): MapAnchor {
  const bounds = container.getBoundingClientRect();
  return {
    x: (event.clientX - bounds.left) / bounds.width,
    y: (event.clientY - bounds.top) / bounds.height,
  };
}

function cardPosition(anchor: MapAnchor, viewport: MapViewport, width: number, height: number) {
  const x = anchor.x * viewport.width;
  const y = anchor.y * viewport.height;
  const rightSpace = viewport.right - x;
  const leftSpace = x - viewport.left;
  const proposedLeft = rightSpace >= leftSpace ? x + 12 : x - width - 12;
  return {
    left: Math.max(viewport.left + 8, Math.min(viewport.right - width - 8, proposedLeft)),
    top: Math.max(viewport.top + 8, Math.min(viewport.bottom - height - 8, y - 24)),
  };
}

export function ElectionMap(props: ElectionMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const stateRefs = useRef(new Map<string, SVGGElement>());
  const pointerFocus = useRef(false);
  const [viewport, setViewport] = useState<MapViewport>({
    width: props.data.layout.width,
    height: props.data.layout.height,
    left: 0,
    right: props.data.layout.width,
    top: 0,
    bottom: props.data.layout.height,
  });
  const [cardHeight, setCardHeight] = useState(310);
  const [anchor, setAnchor] = useState<MapAnchor>({ x: 0.5, y: 0.5 });
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  // Keep the last content mounted so CSS can animate dismissal without timers.
  const [lastCard, setLastCard] = useState({
    region: props.shownRegion,
    selected: Boolean(props.activeRegion),
  });
  if (
    props.shownRegion &&
    (lastCard.region !== props.shownRegion || lastCard.selected !== Boolean(props.activeRegion))
  ) {
    setLastCard({ region: props.shownRegion, selected: Boolean(props.activeRegion) });
  }
  const lastShown = lastCard.region;
  const shown = props.shownRegion;
  const selected = props.activeRegion;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const bounds = container.getBoundingClientRect();
      setViewport({
        width: bounds.width,
        height: bounds.height,
        left: Math.max(0, -bounds.left),
        right: Math.min(bounds.width, window.innerWidth - bounds.left),
        top: Math.max(0, -bounds.top),
        bottom: Math.min(bounds.height, window.innerHeight - bounds.top),
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("scroll", measure, true);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", measure, true);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const hasContent = Boolean(lastShown);
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const observer = new ResizeObserver(() => setCardHeight(card.getBoundingClientRect().height));
    observer.observe(card);
    return () => observer.disconnect();
  }, [hasContent]);

  useEffect(() => {
    const dismiss = () => {
      setHoveredCode(null);
      props.onClear();
      // Move focus to a stable, non-Tab-stop container, not back to the state.
      if (containerRef.current?.contains(document.activeElement))
        containerRef.current.focus({ preventScroll: true });
    };
    const keydown = (event: globalThis.KeyboardEvent) => {
      pointerFocus.current = false;
      if (event.key === "Escape" && (props.activeRegion || props.shownRegion)) {
        event.preventDefault();
        dismiss();
      }
    };
    const pointerdown = (event: globalThis.PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (
        containerRef.current?.contains(target) &&
        (target.closest("[data-map-state]") || cardRef.current?.contains(target))
      )
        return;
      if (props.activeRegion || props.shownRegion) {
        setHoveredCode(null);
        props.onClear();
        if (containerRef.current?.contains(document.activeElement))
          containerRef.current.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("pointerdown", pointerdown);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("pointerdown", pointerdown);
    };
  }, [props]);

  const dismiss = () => {
    setHoveredCode(null);
    props.onClear();
    containerRef.current?.focus({ preventScroll: true });
  };
  const activateFromKeyboard = (state: MapRegion) => {
    setAnchor({ x: state.x / props.data.layout.width, y: state.y / props.data.layout.height });
    props.onActivate(state.code);
  };
  const trackPointer = (event: PointerEvent<SVGGElement>, state: MapRegion) => {
    if (event.pointerType === "touch") return;
    setHoveredCode(state.code);
    if (selected || !containerRef.current) return;
    setAnchor(pointerAnchor(event, containerRef.current));
    props.onPreview(state.code);
  };
  const handleCloseKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "Tab" || !selected) return;
    const index = props.data.regions.findIndex((region) => region.code === selected.code);
    const destination = event.shiftKey ? selected : props.data.regions[index + 1];
    if (destination) {
      event.preventDefault();
      stateRefs.current.get(destination.code)?.focus();
    }
    // At the last state, natural Tab leaves the map and the blur handler clears it.
  };
  const cardWidth = Math.max(
    0,
    Math.min(viewport.width < 640 ? 220 : 320, viewport.right - viewport.left - 16),
  );
  const maxHeight = Math.max(0, viewport.bottom - viewport.top - 16);
  const position = cardPosition(anchor, viewport, cardWidth, Math.min(cardHeight, maxHeight));

  return (
    <div
      ref={containerRef}
      aria-label="Election map and results"
      role="group"
      tabIndex={-1}
      className={`relative outline-none ${props.className ?? ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setHoveredCode(null);
          props.onClear();
        }
      }}
      onPointerLeave={() => {
        setHoveredCode(null);
        if (!selected) props.onPreview(null);
      }}
    >
      <svg
        aria-label="Brazil first-round presidential results. Tab through states to explore."
        role="group"
        viewBox={`0 0 ${props.data.layout.width} ${props.data.layout.height}`}
        className="block h-auto w-full"
      >
        <g aria-hidden="true" pointerEvents="none">
          {props.data.regions.map((state) => (
            <path
              key={state.code}
              d={state.path}
              fill={state.fill}
              stroke="#ffffff"
              strokeWidth={1}
              style={{ filter: hoveredCode === state.code ? "brightness(1.08)" : "brightness(1)" }}
              className="transition-[filter] duration-120 motion-reduce:transition-none"
            />
          ))}
        </g>
        {props.data.regions.map((state) => {
          const external = state.calloutPath !== null;
          return (
            <g
              key={state.code}
              ref={(node) => {
                if (node) stateRefs.current.set(state.code, node);
                else stateRefs.current.delete(state.code);
              }}
              data-map-state={state.code}
              aria-label={state.accessibleLabel}
              aria-describedby={shown?.code === state.code ? props.cardId : undefined}
              aria-pressed={selected?.code === state.code}
              role="button"
              tabIndex={0}
              className="cursor-pointer outline-none"
              onClick={(event) => {
                pointerFocus.current = false;
                if (event.detail && containerRef.current)
                  setAnchor(pointerAnchor(event, containerRef.current));
                else
                  setAnchor({
                    x: state.x / props.data.layout.width,
                    y: state.y / props.data.layout.height,
                  });
                props.onActivate(state.code);
              }}
              onFocus={() => {
                if (!pointerFocus.current) activateFromKeyboard(state);
              }}
              onKeyDown={(event) => {
                pointerFocus.current = false;
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  activateFromKeyboard(state);
                }
                if (event.key === "Tab" && !event.shiftKey && selected?.code === state.code) {
                  event.preventDefault();
                  closeRef.current?.focus();
                }
                if (event.key === "Tab" && event.shiftKey) {
                  const index = props.data.regions.findIndex(
                    (region) => region.code === state.code,
                  );
                  const previous = props.data.regions[index - 1];
                  if (previous) {
                    event.preventDefault();
                    stateRefs.current.get(previous.code)?.focus();
                    requestAnimationFrame(() => closeRef.current?.focus());
                  }
                }
              }}
              onPointerDown={() => {
                pointerFocus.current = true;
              }}
              onPointerEnter={(event) => trackPointer(event, state)}
              onPointerMove={(event) => trackPointer(event, state)}
              onPointerLeave={() => {
                setHoveredCode(null);
                if (!selected) props.onPreview(null);
              }}
            >
              <path d={state.path} fill="transparent" />
              {external && (
                <path
                  aria-hidden="true"
                  d={state.calloutPath ?? undefined}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.2}
                />
              )}
              <text
                aria-hidden="true"
                x={state.label[0]}
                y={state.label[1]}
                fill={external ? "currentColor" : "#ffffff"}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={23}
                fontWeight={700}
                paintOrder="stroke"
                stroke={external ? "var(--card)" : "#00000030"}
                strokeWidth={3}
              >
                {state.code}
              </text>
              {external && (
                <rect
                  x={state.label[0] - 24}
                  y={state.label[1] - 20}
                  width={48}
                  height={40}
                  fill="transparent"
                />
              )}
            </g>
          );
        })}
        {selected && (
          <path
            aria-hidden="true"
            d={selected.path}
            fill="none"
            stroke="#111111"
            strokeWidth={3}
            vectorEffect="non-scaling-stroke"
            pointerEvents="none"
          />
        )}
      </svg>
      {lastShown && (
        <div
          ref={cardRef}
          id={props.cardId}
          aria-hidden={!shown}
          inert={!shown}
          role={lastCard.selected ? "group" : "tooltip"}
          aria-label={lastCard.selected ? `${lastShown.result.name} results` : undefined}
          style={{
            ...position,
            width: cardWidth,
            maxHeight,
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(4px)",
            transitionProperty: lastCard.selected
              ? "opacity, transform, left, top"
              : "opacity, transform",
          }}
          className={`absolute z-10 overflow-auto rounded-md transition-[opacity,transform] duration-120 starting:opacity-0 starting:translate-y-1 motion-reduce:transition-none motion-reduce:duration-0 ${shown && selected ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <ElectionResultCard
            result={lastShown.result}
            dense={viewport.width < 640}
            closeButtonRef={closeRef}
            onClose={lastCard.selected ? dismiss : undefined}
            onCloseKeyDown={handleCloseKeyDown}
          />
        </div>
      )}
    </div>
  );
}
