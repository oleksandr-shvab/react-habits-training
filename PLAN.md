# Habit Tracker — React Practice Project

A daily habit tracker where you can add habits, mark them done each day, and see streaks over time.

The goal is **not** to build a polished product — it's to touch every important React concept hands-on.

---

## Tech Stack

| Tool | Why |
|---|---|
| **Vite 2 + React 18 + TypeScript** | Fast dev server, modern React |
| **Tailwind CSS** | Utility classes — no context switching to write CSS |
| **localStorage** | Persist data without a backend (practice `useEffect`) |

> **Shadcn/ui** requires Node ≥ 18. Once you upgrade Node you can add it on top of Tailwind — it's just pre-built Tailwind components.

---

## What you'll build (feature list)

- Add / delete habits
- Check off a habit for today
- See a streak count (consecutive days)
- Filter habits (all / done / pending)
- Dark mode toggle
- Stats summary (% completed today)

---

## React concepts covered — by step

| Step | Feature | Concept |
|---|---|---|
| 1 | Render a hardcoded list of habits | **JSX**, components, props |
| 2 | Add & delete habits via a form | **useState** (strings, arrays) |
| 3 | Check off habits for today | **useState** (derived state, conditional rendering) |
| 4 | Persist habits in localStorage | **useEffect** (side effects, dependency array) |
| 5 | Auto-focus the input field | **useRef** (DOM access) |
| 6 | Pass habits without prop drilling | **useContext** + **useReducer** |
| 7 | Filter habits list | **useMemo**, **useCallback** |
| 8 | Prevent unnecessary re-renders | **React.memo** |
| 9 | Extract reusable logic | **Custom hooks** (`useLocalStorage`, `useHabits`) |
| 10 | Streak counter | Putting it all together |

---

## Step-by-step guide

---

### Step 1 — JSX & Components (~30 min)

**Goal:** Display a list of habits on screen using components.

**What to do:**
1. Create `src/components/HabitList.tsx`
2. Create `src/components/HabitItem.tsx`
3. In `App.tsx`, define a hardcoded array of habits (just strings or simple objects) and pass it to `HabitList`
4. `HabitList` receives the array as a prop and renders a `HabitItem` for each one
5. `HabitItem` receives a single habit as a prop and displays it

**Things to think about:**
- What shape should a habit object be? (id, name, …?)
- Where does the `key` prop go and why does React need it?
- What is the difference between a component and an element?

**Definition of done:** You can see at least 3 hardcoded habits rendered on the page.

---

### Step 2 — useState: Adding & Deleting Habits (~45 min)

**Goal:** Let the user type a habit name and add it to the list. Also allow deletion.

**What to do:**
1. Create `src/components/AddHabitForm.tsx` with a controlled text input
2. Add a habits array to state in `App.tsx` (replace the hardcoded array)
3. Pass an `onAdd` callback down to the form
4. Add a delete button to `HabitItem`, pass an `onDelete` callback down

**Things to think about:**
- What makes an input "controlled" in React?
- Why do we never mutate state directly (`habits.push(...)` is wrong)?
- How do you generate a unique id for each habit? (`Date.now()` is fine for now)
- Where should the state live — in `App`, in `HabitList`, or somewhere else?

**Definition of done:** You can add and remove habits, and the list updates instantly.

---

### Step 3 — useState: Tracking Completion (~45 min)

**Goal:** Each habit can be checked/unchecked for today. Show a progress summary.

**What to do:**
1. Add a `completedToday: boolean` field to the habit object
2. Add a checkbox or toggle button to `HabitItem`
3. Show how many habits are done out of total (e.g. "3 / 5 done today")
4. Style completed habits differently (strikethrough or muted color)

**Things to think about:**
- How do you update one item inside a state array without mutating it?
- The summary ("3 / 5") is **derived** from state — you don't need extra state for it
- What is conditional rendering? (`condition && <Component />` or ternary)

**Definition of done:** Checking a habit updates the counter at the top.

---

### Step 4 — useEffect: localStorage Persistence (~1 hour)

**Goal:** Habits survive a page refresh.

**What to do:**
1. After the habits state changes, save it to localStorage
2. When the app first loads, read habits from localStorage
3. Handle the case where localStorage is empty (first visit)

**Things to think about:**
- `useEffect` with no dependency array runs on every render — is that what you want here?
- `useEffect` with `[]` runs only on mount — is that enough for the save?
- `useEffect` with `[habits]` runs whenever `habits` changes — when do you use this?
- `JSON.stringify` / `JSON.parse` are your friends

**Definition of done:** Add a habit, refresh the page — it's still there.

---

### Step 5 — useRef: DOM Access (~30 min)

**Goal:** When the user clicks "Add habit", the input gets focus automatically.

**What to do:**
1. Create a `ref` for the input element in `AddHabitForm`
2. After a habit is successfully added (form submitted), call `.focus()` on the ref
3. Bonus: use a ref to track how many times the habits list has been updated (without triggering a re-render)

**Things to think about:**
- What is the difference between a ref and state?
- Why doesn't changing a ref value cause a re-render?
- When do you reach for `useRef` over `useState`?

**Definition of done:** After submitting the form the input is automatically focused and cleared.

---

### Step 6 — useContext + useReducer (~1 hour)

**Goal:** Avoid passing `habits`, `onAdd`, `onDelete`, `onToggle` through every component. Add a dark mode toggle.

**What to do:**
1. Create `src/context/HabitsContext.tsx`
2. Move habits state into the context provider
3. Move add/delete/toggle logic into a `useReducer` (actions: `ADD_HABIT`, `DELETE_HABIT`, `TOGGLE_HABIT`)
4. Any component can now call `useContext(HabitsContext)` instead of receiving props
5. Create a separate `ThemeContext` with a `darkMode: boolean` and a toggle function

**Things to think about:**
- When is context overkill? (hint: small apps with 2-3 levels of props are fine with props)
- What is the difference between `useState` and `useReducer`? When do you prefer one over the other?
- Why should you avoid putting everything in one giant context?

**Definition of done:** `App.tsx` no longer passes habits-related props to children. Dark mode toggle works.

---

### Step 7 — useMemo & useCallback (~45 min)

**Goal:** Add a filter (All / Done / Pending). Make sure filtering doesn't do unnecessary work.

**What to do:**
1. Add a filter state (`'all' | 'done' | 'pending'`)
2. Compute `filteredHabits` using `useMemo` so it only recalculates when `habits` or `filter` changes
3. Wrap the `onToggle`/`onDelete` callbacks in `useCallback`

**Things to think about:**
- `useMemo` caches a **value**. `useCallback` caches a **function**. What's the difference in practice?
- When is `useMemo` actually useful vs premature optimization?
- What would happen without `useMemo` here?

**Definition of done:** Filter buttons work. You can explain why `useMemo` is (or isn't) needed here.

---

### Step 8 — React.memo (~30 min)

**Goal:** Understand when components re-render and how to prevent unnecessary ones.

**What to do:**
1. Add a `console.log('HabitItem rendered:', habit.name)` inside `HabitItem`
2. Type in the add-habit input — notice how many times each `HabitItem` re-renders
3. Wrap `HabitItem` in `React.memo`
4. Observe the difference

**Things to think about:**
- Why does typing in the input re-render all `HabitItem`s even though habits didn't change?
- `React.memo` does a **shallow comparison** — what does that mean?
- Why does `React.memo` work better when callbacks are wrapped in `useCallback`?

**Definition of done:** After adding `React.memo`, `HabitItem` only re-renders when its own habit changes.

---

### Step 9 — Custom Hooks (~1 hour)

**Goal:** Extract reusable logic into hooks so components stay clean.

**What to do:**
1. Create `src/hooks/useLocalStorage.ts` — a generic hook that syncs any state value with localStorage
2. Replace the manual `useEffect` + `JSON.parse`/`JSON.stringify` with `useLocalStorage`
3. Create `src/hooks/useHabits.ts` — wraps all habit logic (add, delete, toggle, filter) in one hook

**Things to think about:**
- A custom hook is just a function that starts with `use` and can call other hooks — that's it
- What are the benefits of `useLocalStorage<T>` being generic (TypeScript)?
- After extracting `useHabits`, what does your `App.tsx` look like? Is it simpler?

**Definition of done:** `App.tsx` is noticeably cleaner. `useLocalStorage` works for any data type.

---

### Step 10 — Streak Counter (Putting it all together, ~1 hour)

**Goal:** Track how many consecutive days each habit was completed.

**What to do:**
1. Change the habit data model: instead of `completedToday: boolean`, store `completedDates: string[]` (ISO date strings)
2. "Today's" checkbox toggles today's date in that array
3. Calculate the streak: count consecutive days ending today
4. Display the streak badge on each `HabitItem`

**Things to think about:**
- How do you reset "today's completion" at midnight? (Bonus: `useEffect` + `setInterval` or just re-derive on render)
- The streak calculation is a good candidate for `useMemo` — why?
- Now that dates are stored, you could build a simple calendar view — that's your stretch goal

**Definition of done:** Each habit shows a streak count that increments on consecutive days.

---

## Useful snippets (cheat sheet)

```tsx
// Controlled input
const [value, setValue] = useState('')
<input value={value} onChange={e => setValue(e.target.value)} />

// Update one item in array (immutably)
setHabits(prev => prev.map(h => h.id === id ? { ...h, done: true } : h))

// Delete from array
setHabits(prev => prev.filter(h => h.id !== id))

// localStorage
localStorage.setItem('key', JSON.stringify(value))
const stored = localStorage.getItem('key')
const parsed = stored ? JSON.parse(stored) : defaultValue

// useRef for DOM
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// Context pattern
const MyContext = createContext<MyType | null>(null)
export const useMyContext = () => {
  const ctx = useContext(MyContext)
  if (!ctx) throw new Error('useMyContext must be used inside MyProvider')
  return ctx
}
```

---

## File structure (end goal)

```
src/
  components/
    AddHabitForm.tsx
    HabitItem.tsx
    HabitList.tsx
    FilterBar.tsx
    StatsHeader.tsx
  context/
    HabitsContext.tsx
    ThemeContext.tsx
  hooks/
    useLocalStorage.ts
    useHabits.ts
  types.ts          ← shared TypeScript types
  App.tsx
  main.tsx
  index.css
```

---

## How to run

```bash
cd habit-tracker
npm run dev
```
