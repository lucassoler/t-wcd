import TemplateCreating from "../../src/application/usecases/TemplateCreating";
import TemplateRepositoryInMemory from "../../src/infrastructure/repositories/TemplateRepositoryInMemory";

let templateRepository:TemplateRepositoryInMemory;

describe('Create a new template', () => {
    describe('Return an error', () => {
        test('if name is empty', async () => {
            const templateCreating:TemplateCreating = createHandler();
            const result = await templateCreating.Execute('');
            verifyError(result.error, 'name is required');
        });
    });

    describe('Create a new template', () => {
        test('if name is valid', async () => {
            const templateCreating:TemplateCreating = createHandler();
            const result = await templateCreating.Execute('Template');
            verifyTemplate(result.succeed);
        });
    });
});

function createHandler(): TemplateCreating {
    templateRepository = new TemplateRepositoryInMemory([]);
    return new TemplateCreating(templateRepository);
}

function verifyTemplate(template: any) {
    expect(template).not.toBeUndefined();
    expect(template.name).toBe('Template');
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}
