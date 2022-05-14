import React, {SVGProps} from 'react'

interface Props{
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: string
    onClick?: () => {}
}

const SidebarRow = ({Icon, title, onClick}: Props) => {
  return (
    <div onClick={() => onClick?.()} className="group flex max-w-fit items-center space-x-2 py-4 rounded-full hover:bg-gray-200 cursor-pointer transition-all p-4 duration-200">
        <Icon className="h-6 w-6"/>
        <p className="text-base font-light lg:text-xl hidden md:inline group-hover:font-normal">{title}</p>
    </div>
  )
}

export default SidebarRow