'use client'

type Props = {
  value: string
  options: string[]
  onChange: (value: string) => void
}

export default function CategoryDropdown({ value, options, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white dark:bg-secondary text-black dark:text-white transition-all duration-30 w-full md:w-auto px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">All Categories</option>
      {options.map((category) => (
        <option key={category} value={category}>
          {category[0].toUpperCase() + category.slice(1)}
        </option>
      ))}
    </select>
  )
}
