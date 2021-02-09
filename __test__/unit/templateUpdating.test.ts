import TemplateBuilder from "../../src/application/builders/templateBuilder";
import TemplateCreating from "../../src/application/usecases/TemplateCreating";
import TemplateUpdating from "../../src/application/usecases/TemplateUpdating";
import Template from "../../src/domain/entities/Template";
import TemplateRepositoryInMemory from "../../src/infrastructure/repositories/TemplateRepositoryInMemory";

let templateRepository:TemplateRepositoryInMemory;

describe('Template Updating', () => {
    describe('Return an error', () => {
        test('if name is empty', async () => {
            const templateUpdating:TemplateUpdating = createHandler();
            const result = await templateUpdating.Execute('123', '');
            verifyError(result.error, 'name is required');
        });

        test('if template is not founded', async () => {
            const templateUpdating:TemplateUpdating = createHandler();
            const result = await templateUpdating.Execute('123', 'Template');
            verifyError(result.error, 'template not founded');
        });
    });

    describe('Update the template', () => {
        test('with valid name and valid ID', async () => {
            const templateUpdating:TemplateUpdating = createHandler([new TemplateBuilder().withId('1').withName('Template to update').build()]);
            const result = await templateUpdating.Execute('1', 'Template Updated');
            verifyTemplate(result.succeed, 'Template Updated')
        });
    });
});

function createHandler(templatePopulation:Template[] = []): TemplateUpdating {
    templateRepository = new TemplateRepositoryInMemory(templatePopulation);
    return new TemplateUpdating(templateRepository);
}

function verifyTemplate(template: Template, newName:string) {
    expect(template).not.toBeUndefined();
    expect(template.name).toBe(newName);
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}