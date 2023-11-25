import { Info, Close } from "../../public/svg"

export default function Alert({ type, clickHandler, children }) {
  const alertStyles = {
    blue: 'text-blue-800 bg-blue-50 dark:bg-gray-800 dark:text-blue-400',
    red: 'bg-red-50 dark:bg-gray-800 dark:text-red-400',
    green: 'text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400',
    yellow: 'text-yellow-800 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300',
    gray: 'bg-gray-50 dark:bg-gray-800'
  };

  return (
    <div class={`${alertStyles[type]} rounded-lg flex items-center p-4`} role="alert">
      <Info />
      <div class="ms-3 text-sm font-medium">
        {children}
      </div>
      <button onClick={clickHandler} type="button" class={`ms-auto -mx-1.5 -my-1.5 ${alertStyles[type]} rounded-lg focus:ring-2 focus:ring-${type}-400 p-1.5 hover:bg-${type}-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-${type}-400 dark:hover:bg-gray-700`} aria-label="Close">
        <Close />
      </button>
    </div>
  )
}