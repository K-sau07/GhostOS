"use client";
import { useMemo, useState } from "react";
import { useOS } from "@/lib/store";
import { projects, KIND_LABEL, type Kind } from "@/lib/content";
import {
  Toolbar, Segmented, SearchField, Sidebar, SidebarGroup, SidebarItem,
  StatusBar, GlyphGrid, GlyphList,
} from "./MacChrome";
import { IconApp, IconSystems, IconFolder, IconDoc } from "./Icons";

type View = "grid" | "list";
type Loc = "all" | "featured" | Kind;

const iconFor = (k: Kind) =>
  k === "infra" ? IconSystems : k === "quality" ? IconDoc : k === "data" ? IconFolder : IconApp;

export default function FinderApp() {
  const { open } = useOS();
  const [view, setView] = useState<View>("grid");
  const [loc, setLoc] = useState<Loc>("all");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length, featured: 0 };
    for (const p of projects) {
      c[p.kind] = (c[p.kind] ?? 0) + 1;
      if (p.featured) c.featured++;
    }
    return c;
  }, []);

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    return projects.filter((p) => {
      if (loc === "featured" && !p.featured) return false;
      if (loc !== "all" && loc !== "featured" && p.kind !== loc) return false;
      if (!s) return true;
      return (
        p.name.toLowerCase().includes(s) ||
        p.file.toLowerCase().includes(s) ||
        p.tagline.toLowerCase().includes(s) ||
        p.stack.some((t) => t.toLowerCase().includes(s))
      );
    });
  }, [loc, q]);

  const launch = (id: string, file: string) => open(`proj:${id}`, file, 920, 660);

  return (
    <div className="h-full flex flex-col">
      <Toolbar title={loc === "all" ? "All Projects" : loc === "featured" ? "Featured" : KIND_LABEL[loc as Kind]}>
        <Segmented<View>
          value={view} onChange={setView}
          options={[
            { id: "grid", glyph: GlyphGrid, label: "Icon view" },
            { id: "list", glyph: GlyphList, label: "List view" },
          ]}
        />
        <SearchField value={q} onChange={setQ} placeholder="Search projects" />
      </Toolbar>

      <div className="flex-1 flex min-h-0">
        <Sidebar width={176}>
          <SidebarGroup label="FAVOURITES">
            <SidebarItem label="All Projects" active={loc === "all"}
              onClick={() => setLoc("all")} badge={String(counts.all)}
              icon={<IconFolder size={14} />} />
            <SidebarItem label="Featured" active={loc === "featured"}
              onClick={() => setLoc("featured")} badge={String(counts.featured)}
              icon={<IconApp size={14} />} />
          </SidebarGroup>

          <SidebarGroup label="CATEGORIES">
            {(Object.keys(KIND_LABEL) as Kind[]).map((k) => {
              const I = iconFor(k);
              return (
                <SidebarItem key={k} label={KIND_LABEL[k]} active={loc === k}
                  onClick={() => setLoc(k)} badge={String(counts[k] ?? 0)}
                  icon={<I size={14} />} />
              );
            })}
          </SidebarGroup>
        </Sidebar>

        <div className="flex-1 overflow-auto">
          {items.length === 0 && (
            <div className="h-full grid place-items-center">
              <span className="mono text-[11px] tracking-[.14em] text-white/30">NO ITEMS MATCH</span>
            </div>
          )}

          {view === "grid" ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-1.5 p-4">
              {items.map((p) => {
                const I = iconFor(p.kind);
                const on = sel === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSel(p.id)}
                    onDoubleClick={() => launch(p.id, p.file)}
                    className="flex flex-col items-center gap-2 p-2.5 rounded-[7px] transition-colors"
                    style={{ background: on ? "rgba(255,255,255,.14)" : "transparent" }}
                  >
                    <span className={on ? "text-white" : "text-white/72"}><I size={38} /></span>
                    <span className="mono text-[10px] leading-tight text-center text-white/82
                                     px-1.5 py-[2px] rounded truncate max-w-full"
                          style={{ background: on ? "rgba(255,255,255,.18)" : "transparent" }}>
                      {p.file}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-[#16181B]">
                <tr className="mono text-[9.5px] tracking-[.14em] text-white/34">
                  <th className="font-normal px-4 py-2 border-b border-white/[.08]">NAME</th>
                  <th className="font-normal px-3 py-2 border-b border-white/[.08]">KIND</th>
                  <th className="font-normal px-3 py-2 border-b border-white/[.08]">SIZE</th>
                  <th className="font-normal px-4 py-2 border-b border-white/[.08]">MODIFIED</th>
                </tr>
              </thead>
              <tbody>
                {items.map((p, i) => {
                  const I = iconFor(p.kind);
                  const on = sel === p.id;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => setSel(p.id)}
                      onDoubleClick={() => launch(p.id, p.file)}
                      className="cursor-default transition-colors"
                      style={{
                        background: on ? "rgba(255,255,255,.15)"
                          : i % 2 ? "rgba(255,255,255,.017)" : "transparent",
                      }}
                    >
                      <td className="px-4 py-[7px]">
                        <span className="flex items-center gap-2.5 min-w-0">
                          <span className="text-white/60 shrink-0"><I size={15} /></span>
                          <span className="mono text-[12px] text-white/90 truncate">{p.file}</span>
                          <span className="text-[11.5px] text-white/38 truncate hidden lg:inline">
                            — {p.tagline}
                          </span>
                        </span>
                      </td>
                      <td className="mono px-3 py-[7px] text-[10.5px] text-white/50 whitespace-nowrap">
                        {KIND_LABEL[p.kind]}
                      </td>
                      <td className="mono px-3 py-[7px] text-[10.5px] text-white/50 whitespace-nowrap">
                        {p.size}
                      </td>
                      <td className="mono px-4 py-[7px] text-[10.5px] text-white/50 whitespace-nowrap">
                        {p.when}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <StatusBar>
        {items.length} of {projects.length} items
        {sel && ` · ${projects.find((p) => p.id === sel)?.file} selected`}
        {!sel && " · double-click to open"}
      </StatusBar>
    </div>
  );
}
