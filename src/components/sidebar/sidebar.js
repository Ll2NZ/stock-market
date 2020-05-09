import React from 'react';
import { LrnzIcon } from '../../icons/';
import { DashboardIcon } from '../../icons/';
import { FinancialsIcon } from '../../icons/';
import './style.scss';

const routes = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    id: 'financials',
    name: 'Financials',
    icon: <FinancialsIcon />
  }
];

const Sidebar = () => {
  return (
    <section className="h-screen w-1/6 fixed border-r">
      <div className="flex items-center p-4 border-b">
        <LrnzIcon />
      </div>
      <div className="sidebar-routes-container">
        <form>
          {routes.map(route => (
            <div key={route.id} className="flex">
              <input
                className="hidden"
                type="radio"
                name="route-selector"
                id={route.id}
                defaultChecked
              />
              <label
                className="flex items-center px-4 py-3 w-full cursor-pointer"
                htmlFor={route.id}
              >
                {route.icon}
                <span className="pl-4">{route.name}</span>
              </label>
            </div>
          ))}
        </form>
      </div>
    </section>
  );
};

export default Sidebar;
