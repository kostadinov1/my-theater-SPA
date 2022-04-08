import { editEvent, getEventDetails } from "../api/data.js";
import { html } from "../lib.js"

const editTemplate = (event, onSubmit) => html`
        <section id="createPage">
            <form @submit=${onSubmit} class="create-form">
                <h1>Edit Theater</h1>
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
                    <input id="author" name="author" type="text" placeholder="Author" .value=${event.author}>
                </div>
                <div>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" placeholder="Description" .value=${event.description}></textarea>
                </div>
                <div>
                    <label for="imageUrl">Image url:</label>
                    <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${event.imageUrl}>
                </div>
                <button class="btn" type="submit">Submit</button>
            </form>
        </section>
`;


export async function editPage(context) {
    const event = await getEventDetails(context.params.id)

    context.render(editTemplate(event, onSubmit))

    async function onSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)

        title = formData.get('title')
        date = formData.get('date')
        author = formData.get('author')
        description = formData.get('description')
        imageUrl = formData.get('imageUrl')

        if (title == '' || description == '' || imageUrl == '' || date == '' || author == '') {
            return alert('All fields are required!')
        } 

        await editEvent(context.params.id, {
            title,
            date,
            author,
            imageUrl,
            description
        })

        context.page.redirect('/')


    }
}