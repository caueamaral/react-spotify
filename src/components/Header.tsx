import Logo from './Logo'
import Search from './Search'

export default function Header() {
    return  (
        <header className="bg-black flex items-center justify-between p-5">
            <Logo />
            <Search />
        </header>
    )
}