import { html } from "../lib.js";
import { deleteEvent, getEventDetails } from "../api/data.js";

const deleteTemplate = (event, onDelete) => html`
        <section id="editPage">
            <form @submit=${onDelete} class="theater-form">
                <h1>Delete Theater</h1>
                <div>
                    <label for="title">Title:</label>
                    <input id="title" name="title" type="text" placeholder="Theater name" .value=${event.title}>
                </div>
                <div>
                    <label for="date">Date:</label>
                    <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${event.date}>
                </div>
                <div>
                    <label for="author">Author:</label>
                    <input id="author" name="author" type="text" placeholder="Author"
                        .value=${event.author}>
                </div>
                <div>
                    <label for="description">Theater Description:</label>
                    <textarea id="description" name="description"
                        placeholder="Description" .value=${event.decription}></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url"
                        .value=${event.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;

export async function deletePage(context) {
    const event = await getEventDetails(context.params.id)
    context.render(deleteTemplate(event, onDelete))

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete?')

        if (choice) {
            await deleteEvent(context.params.id)
            context.page.redirect('/')
        }
    }
}