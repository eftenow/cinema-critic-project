import { html } from '../../node_modules/lit-html/lit-html.js';
import { editExisting, getDetails } from '../services/itemServices.js';


const editTemplate = (ctx, item) => html`
<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form class="edit-form" @submit='${(ev) => editProductHandler(ev, ctx)}'>
      <input value="${item.brand}" type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input value="${item.model}" type="text" name="model" id="shoe-model" placeholder="Model" />
      <input value="${item.imageUrl}" type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
      <input value="${item.release}" type="text" name="release" id="shoe-release" placeholder="Release date" />
      <input value="${item.designer}" type="text" name="designer" id="shoe-designer" placeholder="Designer" />
      <input value="${item.value}" type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`

export async function renderEdit(ctx) {
  const id = ctx.params.id;
  const editProduct = await getDetails(id);

  const edit = editTemplate(ctx, editProduct);
  ctx.render(edit);
};

async function editProductHandler(ev, ctx) {
  ev.preventDefault();
  let form = new FormData(ev.target);
  let model = form.get('model');
  let brand = form.get('brand');
  let imageUrl = form.get('imageUrl');
  let release = form.get('release');
  let designer = form.get('designer');
  let value = form.get('value');

  let editedItem = { brand, model, imageUrl, release, designer, value };

  if (Object.values(editedItem).some((x) => !x)) {
    return alert('All fields must be filled!')
  };

  await editExisting(ctx.params.id, editedItem);

  ctx.redirect(`/dashboard/${ctx.params.id}`);
}

