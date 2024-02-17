let formData = [
    {
        "id": "c0ac49c5-871e-4c72-a878-251de465e6b4",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample placeholder"
    },
    {
        "id": "146e69c2-1630-4a27-9d0b-f09e463a66e4",
        "type": "select",
        "label": "Select",
        "options": ["Sample Option1", "Sample Option2", "Sample Option3"]
    },
   
    {
        "id": "680cff8d-c7f9-40be-8767-e3d6ba420952",
        "type": "textarea",
        "label": "Text area",
        "placeholder": "Sample Placeholder"
    },
    {
        "id": "45002ecf-85cf-4852-bc46-529f94a758f5",
        "type": "input",
        "label": "Sample Label",
        "placeholder": "Sample Placeholder"
    },
]
;

function renderForm() {
    const formContainer = document.getElementById("form-container");
    formContainer.innerHTML = "";

    formData.forEach((element, index) => {
        const formField = document.createElement("div");
        formField.className = "form-field";

        const formElement = document.createElement(element.type);
        formElement.id = element.id;
        formElement.placeholder = element.placeholder;
        formElement.draggable = true;
        formElement.setAttribute("ondragstart", "drag(event)");

        if (element.type === "select") {
            element.options.forEach(option => {
                const optionElement = document.createElement("option");
                optionElement.text = option;
                formElement.add(optionElement);
            });
        }

        const labelElement = document.createElement("label");
        labelElement.innerText = element.label;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("button-delete");
        deleteButton.onclick = () => deleteField(index);

        formField.appendChild(labelElement);
        formField.appendChild(formElement);
        formField.appendChild(deleteButton);

        formContainer.appendChild(formField);
    });
}

function addInput() {
    formData.push({ "id": generateId(), "type": "input", "label": "Sample Label", "placeholder": "Sample Placeholder" });
    renderForm();
}

function addSelect() {
    formData.push({ "id": generateId(), "type": "select", "label": "Select", "options": ["Sample Option1", "Sample Option2", "Sample Option3"] });
    renderForm();
}

function addTextarea() {
    formData.push({ "id": generateId(), "type": "textarea", "label": "Text area", "placeholder": "Sample Placeholder" });
    renderForm();
}

function deleteField(index) {
    formData.splice(index, 1);
    renderForm();
}

function saveForm() {
    const formValues = [];

    formData.forEach(element => {
        const formElement = document.getElementById(element.id);

        if (formElement) {
            const value = formElement.value;
            formValues.push({ id: element.id, type: element.type, label: element.label, placeholder: element.placeholder, value });
        }
    });

    const updatedJson = JSON.stringify(formValues, null, 2);
    console.log(updatedJson);
}

function generateId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const droppedElementId = event.dataTransfer.getData("text/plain");
    const droppedElementIndex = formData.findIndex(element => element.id === droppedElementId);

    const targetIndex = findDropTargetIndex(event);
    if (targetIndex !== -1) {
        const [removed] = formData.splice(droppedElementIndex, 1);
        formData.splice(targetIndex, 0, removed);
        renderForm();
    }
}

function findDropTargetIndex(event) {
    const formContainer = document.getElementById("form-container");
    const rect = formContainer.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;

    let accumulatedHeight = 0;
    for (let i = 0; i < formContainer.children.length; i++) {
        accumulatedHeight += formContainer.children[i].offsetHeight;
        if (mouseY < accumulatedHeight) {
            return i;
        }
    }

    return formData.length - 1;
}

renderForm();
