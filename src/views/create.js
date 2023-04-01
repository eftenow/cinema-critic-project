import { html } from '../../node_modules/lit-html/lit-html.js';
import { createNew } from '../services/itemServices.js';


const createTemplate = (ctx) => html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form @submit="${(ev) => onCreateHandler(ev, ctx)}" class="create-form">
            <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`

export function renderCreate(ctx) {
    const create = createTemplate(ctx);
    ctx.render(create);
};

async function onCreateHandler(ev, ctx) {
    ev.preventDefault();
    let form = new FormData(ev.target);
    let brand = form.get('brand');
    let model = form.get('model');
    let imageUrl = form.get('imageUrl');
    let release = form.get('release');
    let designer = form.get('designer');
    let value = form.get('value');

    let newItem = { brand, model, imageUrl, release, designer, value };

    if (Object.values(newItem).some((x) => !x)) {
        return alert('All fields must be filled!')
    };

    await createNew(newItem);

    ctx.redirect('/dashboard');

};
