import Logo from './Logo'
import Search from './Search'

export default function Header() {
    return  (
        <header className="bg-black flex flex-column flex-wrap gap-4 items-center justify-between p-5 md:flex-row">
            <Logo />
            <Search />
        </header>
    )
}