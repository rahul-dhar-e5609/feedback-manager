import Dashboard from 'views/Dashboard/Dashboard';
import UserProfile from 'views/UserProfile/UserProfile';
import TableList from 'views/TableList/TableList';
import Typography from 'views/Typography/Typography';
import Icons from 'views/Icons/Icons';
import Maps from 'views/Maps/Maps';
import Notifications from 'views/Notifications/Notifications';

import Payments from 'views/Payments/Payments';
import Survey from 'views/Survey/Survey';

const appRoutes = [
    { path: "/home/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    { path: "/home/payments", name: "Payments", icon: "pe-7s-user", component: Payments },
    { path: "/home/survey", name: "Survey", icon: "pe-7s-user", component: Survey },
    { path: "/home/user", name: "User Profile", icon: "pe-7s-user", component: UserProfile },
/*    { path: "/home/table", name: "Table List", icon: "pe-7s-note2", component: TableList },
    { path: "/home/typography", name: "Typography", icon: "pe-7s-news-paper", component: Typography },
    { path: "/home/icons", name: "Icons", icon: "pe-7s-science", component: Icons },
    { path: "/home/maps", name: "Maps", icon: "pe-7s-map-marker", component: Maps },
    { path: "/home/notifications", name: "Notifications", icon: "pe-7s-bell", component: Notifications },
*/    { redirect: true, path:"/home", to:"/home/dashboard", name: "Dashboard" }
];

export default appRoutes;
