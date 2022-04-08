import { register } from "../api/api.js";
import { html } from "../lib.js";


const registerTemplate = (onSubmit) => html`
<!--Register Page-->
<section id="registerPage">
            <form @submit=${onSubmit} class="registerForm">
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="#">here</a></span>
                </p>
            </form>
        </section>
`;


export async function registerPage(context){

    context.render(registerTemplate(onSubmit))

    async function onSubmit(ev){
        ev.preventDefault()

        const formData = new FormData(ev.target);

        const email = formData.get('email')
        const password = formData.get('password');
        const repass = formData.get('repeatPassword')

        if (email == '' || password == '') {
            return alert('All fields are required!')
        }

        if (password != repass) {
            return alert('Password do not match!')
        }

        await register(email, password)
        context.updateUserNav();
        context.page.redirect('/')
    }
}