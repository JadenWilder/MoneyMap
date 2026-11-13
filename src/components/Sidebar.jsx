
import { NavLink } from 'react-router-dom'

function Sidebar() {
  const links = [
    { name: 'Dashboard', path: '/', icon: '▦' },
    { name: 'Transactions', path: '/transactions', icon: '↕' },
    { name: 'Budgets', path: '/budgets', icon: '◫' },
    { name: 'Savings Goals', path: '/goals', icon: '◎' },
  ]

  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">$</span>
        <h2>MoneyMap</h2>
      </div>

      <p className="nav-label">MENU</p>

      <nav>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            <span>{link.icon}</span>
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Take control of your money.</p>
      </div>
    </aside>
  )
}

export default Sidebar
