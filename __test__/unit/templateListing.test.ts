import SectionBuilder from "../../src/application/builders/sectionBuilder";
import TemplateBuilder from "../../src/application/builders/templateBuilder";
import TemplateListing from "../../src/application/usecases/TemplateListing";
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

describe('List all templates', () => {
    test('Return a list of 0 templates', async () => {
        const templateListing:TemplateListing = createHandler();
        const result = await templateListing.Execute();
        verifyTemplates(result.succeed, []);
    });

    test('Return a list of 1 templates', async () => {
        const templateListing:TemplateListing = createHandler([EXEMPLE_TEMPLATE]);
        const result = await templateListing.Execute();
        verifyTemplates(result.succeed, [EXEMPLE_TEMPLATE]);
    });

    test('Return a list of 2 templates', async () => {
        const templateListing:TemplateListing = createHandler([EXEMPLE_TEMPLATE, EXEMPLE_TEMPLATE_2]);
        const result = await templateListing.Execute();
        verifyTemplates(result.succeed, [EXEMPLE_TEMPLATE, EXEMPLE_TEMPLATE_2]);
    });
});

function verifyTemplates(templates:Template[], expectedTemplates:Template[]) {
    expect(templates.length).toBe(expectedTemplates.length);

    for (let i = 0; i < templates.length; i++) {
        verifyTemplate(templates[i], expectedTemplates[i]);
    }
}

function verifyTemplate(template: Template, expectedTemplate: Template) {
    expect(template.id).toBe(expectedTemplate.id);
    expect(template.name).toBe(expectedTemplate.name);
}

function createHandler(templatePopulation:Template[] = []): TemplateListing {
    templateRepository = new TemplateRepositoryInMemory(templatePopulation);
    return new TemplateListing(templateRepository);
}