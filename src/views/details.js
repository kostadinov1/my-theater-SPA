import { deleteEvent, getEventDetails } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";



const detailsTemplate = (event, isOwner, onDelete) => html`
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>${event.title}</h1>
                    <div>
                        <img src="${event.imageUrl}" />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${event.description}</p>
                    <h4>Date: ${event.date}</h4>
                    <h4>Author: ${event.author}</h4>
                    <div class="buttons">
                        ${isOwner ? html` 
                        <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${event._id}">Edit</a>`: html`
                        <a class="btn-like" href="#">Like</a>`}
                    </div>
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
        </section>
`;

export async function detailsPage(context) {
    const userData = getUserData()
    const event = await getEventDetails(context.params.id)
    const isOwner = userData && userData.id == event._ownerId


    context.render(detailsTemplate(event, isOwner, onDelete))


    async function onDelete() {        

        const choice = confirm('Are you sure you want to delete?')

        if (choice) {
            await deleteEvent(context.params.id)
            context.page.redirect('/')
        }
    }
}

