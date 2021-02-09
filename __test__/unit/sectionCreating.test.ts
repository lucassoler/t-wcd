import SectionBuilder from "../../src/application/builders/sectionBuilder";
import TemplateBuilder from "../../src/application/builders/templateBuilder";
import SectionCreating from "../../src/application/usecases/SectionCreating";
import Template from "../../src/domain/entities/Template";
import TemplateRepositoryInMemory from "../../src/infrastructure/repositories/TemplateRepositoryInMemory";

let templateRepository:TemplateRepositoryInMemory;

const EXEMPLE_TEMPLATE = new TemplateBuilder()
                                .withId('1')
                                .withName('Template to update')
                                .withSections(
                                    [new SectionBuilder().withId('1').withName('Old section').build()])
                                .build();
describe('Create a new section', () => {
    describe('Return an error', () => {
        test('if section name is invalid', async () => {
            const sectionCreating:SectionCreating = createHandler();
            const result = await sectionCreating.Execute('123', '');
            verifyError(result.error, 'name is required');
        });

        test('if template is not founded', async () => {
            const sectionCreating:SectionCreating = createHandler();
            const result = await sectionCreating.Execute('123', 'Section 1');
            verifyError(result.error, 'template not founded');
        });
    });

    describe('Create a new Section', () => {
        test('with valid name on existing template', async () => {
            const sectionCreating:SectionCreating = createHandler([EXEMPLE_TEMPLATE]);
            const result = await sectionCreating.Execute('1', 'Section 1');
            verifySection(result.succeed);
        });

        test('with an other section as parent', async () => {
            const sectionCreating:SectionCreating = createHandler([EXEMPLE_TEMPLATE]);
            const result = await sectionCreating.Execute('1', 'Section 2', '1');
            verifySection(result.succeed, 3, 'Section 2', '1');
        });
    });
});

function createHandler(templatePopulation:Template[] = []): SectionCreating {
    templateRepository = new TemplateRepositoryInMemory(templatePopulation);
    return new SectionCreating(templateRepository);
}

function verifySection(template: Template, sectionsLength:number = 2, sectionName:string = 'Section 1', parentId:string | null = null) {
    expect(template).not.toBeUndefined();
    expect(template.sections.length).toBe(sectionsLength);
    const lastTemplateAdded = template.sections[template.sections.length - 1];
    expect(lastTemplateAdded.name).toBe(sectionName);

    if (parentId === null) {
        expect(lastTemplateAdded.hasParent()).toBeFalsy();
    } else {
        expect(lastTemplateAdded.hasParent()).toBeTruthy();
        expect(lastTemplateAdded.parentId).toBe(parentId);
    }
}

function verifyError(error: Error | null, errorMessage: string) {
    expect(error).toStrictEqual(new Error(errorMessage));
}
