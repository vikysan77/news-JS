export function queryElement<T extends Element>(parent: ParentNode, selector: string): T {
    const element: T | null = parent.querySelector<T>(selector);

    if (!element) {
        throw new Error(`Element not found: ${selector}`);
    }

    return element;
}

export function cloneTemplate(templateId: string): DocumentFragment {
    const template: HTMLTemplateElement | null = document.querySelector<HTMLTemplateElement>(`#${templateId}`);

    if (!template) {
        throw new Error(`Template not found: ${templateId}`);
    }

    const fragment: Node = template.content.cloneNode(true);

    if (!(fragment instanceof DocumentFragment)) {
        throw new Error(`Template did not produce a fragment: ${templateId}`);
    }

    return fragment;
}
