export const DIALOGUE_SETS: [string, string, string][] = [
  ['Scanning your page... 🔍', 'Yikes. This headline would put a caffeinated person to sleep 💀', "Hold on. We're about to commit arson. 🔥"],
  ['Loading your landing page... 🔍', "Sir, your CTA says 'Click Here'. Are you okay? 😭", 'Initiating controlled demolition. 🔥'],
  ['Analyzing conversion elements... 🔍', "No social proof? Bold strategy. Let's see if it pays off. (It won't.) 💀", "Burning it down and starting over. You're welcome. 🔥"],
  ['Reading your copy... 🔍', 'This page has the energy of a Terms & Conditions document. 😐', 'We have seen enough. Initiating the roast. 🔥'],
  ['Evaluating your hero section... 🔍', 'Your value prop is so vague it could sell anything. Or nothing. 💀', 'Time to let the fire do the talking. 🔥'],
]

export const SUCCESS_MESSAGE = 'Rebuilt. Clean. Converts. This is what your page could be. ✨'

export function pickDialogueSet(prevIndex: number): number {
  if (DIALOGUE_SETS.length === 1) return 0
  let next = prevIndex
  while (next === prevIndex) next = Math.floor(Math.random() * DIALOGUE_SETS.length)
  return next
}
