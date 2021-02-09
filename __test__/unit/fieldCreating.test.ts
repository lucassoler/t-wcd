import SectionBuilder from "../../src/application/builders/sectionBuilder";
import TemplateBuilder from "../../src/application/builders/templateBuilder";
import FieldCreating from "../../src/application/usecases/FieldCreating";
import Field from "../../src/domain/entities/Field";
import Template from "../../src/domain/entities/Template";
import TemplateRepositoryInMemory from "../../src/infrastructure/repositories/TemplateRepositoryInMemory";

let templateRepository:TemplateRepositoryInMemory;
const EXEMPLE_TEMPLATE = new TemplateBuilder()
                                .withId('1')
                                .withName('Template to update')
                                .withSections(
                                    [new SectionBuilder().withId('1').withName('Old section').build()])
                                .build();

describe('Create a new Field', () => {
    describe('Return an error', () => {
        test('if name is empty', async () => {
            const fieldCreating:FieldCreating = createHandler();
            const result = await fieldCreating.Execute('123', '', '');
            verifyError(result.error, 'name is required');
        });

        test('if type is empty', async () => {
            const fieldCreating:FieldCreating = createHandler();
            const result = await fieldCreating.Execute('123', 'Field', '');
            verifyError(result.error, 'type is required');
        });

        test('if type not valid', async () => {
            const fieldCreating:FieldCreating = createHandler();
            const result = await fieldCreating.Execute('123', 'Field', 'invalid');
            verifyError(result.error, 'invalid type');
        });

        test('if template is not founded', async () => {
            const fieldCreating:FieldCreating = createHandler();
            const result = await fieldCreating.Execute('123', 'Field', 'string');
            verifyError(result.error, 'template not founded');
        });

        test('if parent is defined but not existing', async () => {
            const fieldCreating:FieldCreating = createHandler([EXEMPLE_TEMPLATE]);
            const result = await fieldCreating.Execute('1', 'Field', 'string', '2');
            verifyError(result.error, 'section not founded');
        });
    });

    describe('Create new field', () => {
        test('with parent id null', async () => {
            const fieldCreating:FieldCreating = createHandler([EXEMPLE_TEMPLATE]);
            const result = await fieldCreating.Execute('1', 'Field', 'string');
            verifyField(result.succeed);
        });
    });
});

function verifyField(field:Field) {
    expect(field).not.toBeNull();
}

function createHandler(templatePopulation:Template[] = []): FieldCreating {
    templateRepository = new TemplateRepositoryInMemory(templatePopulation);
    return new FieldCreating(templateRepository);
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}