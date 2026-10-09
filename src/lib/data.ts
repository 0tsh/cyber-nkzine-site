import { getCollection } from 'astro:content';
import { slugMap } from './slug';

export async function allEvents() {
  const ev = await getCollection('events');
  return ev.sort((a, b) => String(a.data.year).localeCompare(String(b.data.year)) || a.data.id.localeCompare(b.data.id));
}
export async function byActor() {
  const ev = await allEvents();
  const slugs = slugMap(ev.flatMap((e) => e.data.actorNames));
  const map = new Map<string, typeof ev>();
  for (const e of ev) for (const n of e.data.actorNames) (map.get(n) ?? map.set(n, []).get(n)!).push(e);
  return [...map].map(([name, events]) => ({ name, slug: slugs.get(name)!, events })).sort((a, b) => b.events.length - a.events.length || a.name.localeCompare(b.name));
}
export async function bySource() {
  const ev = await allEvents();
  const slugs = slugMap(ev.flatMap((e) => e.data.sourceNames));
  const map = new Map<string, typeof ev>();
  for (const e of ev) for (const n of e.data.sourceNames) (map.get(n) ?? map.set(n, []).get(n)!).push(e);
  return [...map].map(([name, events]) => ({ name, slug: slugs.get(name)!, events })).sort((a, b) => b.events.length - a.events.length || a.name.localeCompare(b.name));
}
export async function byYear() {
  const ev = await allEvents();
  const map = new Map<string, typeof ev>();
  for (const e of ev) (map.get(String(e.data.year)) ?? map.set(String(e.data.year), []).get(String(e.data.year))!).push(e);
  return [...map].map(([year, events]) => ({ year, events })).sort((a, b) => a.year.localeCompare(b.year));
}
