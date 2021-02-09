import SectionBuilder from "../../src/application/builders/sectionBuilder";
import TemplateBuilder from "../../src/application/builders/templateBuilder";
import TemplateGet from "../../src/application/usecases/TemplateGet";
import Template from "../../src/domain/entities/Template";
import TemplateRepositoryInMemory from "../../src/infrastructure/repositories/TemplateRepositoryInMemory";

let templateRepository:TemplateRepositoryInMemory;
const EXEMPLE_TEMPLATE = new TemplateBuilder()
                                .withId('1')
                                .withName('Template to update')
                                .withSections(
                                    [new SectionBuilder().withId('1').withName('Old section').build()])
                                .build();
const EXEMPLE_TEMPLATE_2 = new TemplateBuilder()
                                .withId('2')
                                .withName('Template 2')
                                .build();
                                
describe('Get One Template', () => {
    describe('Return an error', () => {
        test('if template is not founded', async () => {
            const templateGet:TemplateGet = createHandler([EXEMPLE_TEMPLATE]);
            const result = await templateGet.Execute('123');
            verifyError(result.error, 'template not founded');
        });
    });

    describe('Return a template', () => {
        test('with valid id in a source of one template', async () => {
            const templateGet:TemplateGet = createHandler([EXEMPLE_TEMPLATE]);
            const result = await templateGet.Execute('1');
            verifyTemplate(result.succeed, EXEMPLE_TEMPLATE);
        });
        
        test('with valid id in a source of two template', async () => {
            const templateGet:TemplateGet = createHandler([EXEMPLE_TEMPLATE, EXEMPLE_TEMPLATE_2]);
            const result = await templateGet.Execute('1');
            verifyTemplate(result.succeed, EXEMPLE_TEMPLATE);
        });
    });
});

function createHandler(templatePopulation:Template[] = []): TemplateGet {
    templateRepository = new TemplateRepositoryInMemory(templatePopulation);
    return new TemplateGet(templateRepository);
}

function verifyTemplate(template: Template, expectedTemplate: Template) {
    expect(template.id).toBe(expectedTemplate.id);
    expect(template.name).toBe(expectedTemplate.name);
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}