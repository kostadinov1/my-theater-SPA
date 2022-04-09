import { logout } from "./api/api.js";
import { page, render } from "./lib.js"
import { getUserData } from "./util.js"
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { homePage } from "./views/home.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { profilePage } from "./views/profile.js";
import { editPage } from "./views/edit.js";

// made just for testing requests in the browser
import * as data from './api/data.js' 
window.actionsData = data


let root = document.getElementById('content')
document.getElementById('logoutBtn').addEventListener('click', onLogout);


page(decorateContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/create', createPage)
page('/details/:id', detailsPage)
page('/edit/:id', editPage)
page('/profile', profilePage)

updateUserNav()
page.start()


export async function decorateContext(context, next) {
    context.render = (content) => render(content, root)
    context.updateUserNav = updateUserNav;
    next()
}

function onLogout(){
    logout();
    updateUserNav();
    page.redirect('/');
}



export function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.getElementById('userProfile').style.display = 'block';
        document.getElementById('userCreate').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('guestLogin').style.display = 'none';
        document.getElementById('guestRegister').style.display = 'none';
       
    } else {
        document.getElementById('userProfile').style.display = 'none';
        document.getElementById('userCreate').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('guestLogin').style.display = 'block';
        document.getElementById('guestRegister').style.display = 'block';
    }   

}
