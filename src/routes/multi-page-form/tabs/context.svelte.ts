import { getContext, setContext, type Snippet } from 'svelte'

export interface TabsContext {
  tabs: Snippet[]
  selectedTab: number
}

const TABS_CONTEXT = Symbol()

export function getTabsContext(): TabsContext {
  return getContext(TABS_CONTEXT)
}

export function setTabsContext(ctx: TabsContext) {
  setContext(TABS_CONTEXT, ctx)
}

export function createTabsContext(initialTab: number): TabsContext {
  const tabs = $state<Snippet[]>([])
  let selectedTab = $state(initialTab)
  return {
    get tabs() {
      return tabs
    },
    get selectedTab() {
      return selectedTab
    },
    set selectedTab(v) {
      selectedTab = v
    }
  }
}
