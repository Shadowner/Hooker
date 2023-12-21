import { createProgram, type ClassDeclaration, type Program, type TypeChecker } from 'typescript';

export class MetadataGenerator {
	public readonly controllerNodes = new Array<ClassDeclaration>();
	public readonly typeChecker: TypeChecker;
	private readonly program: Program;

	constructor(entryFile: string) {
		this.program = createProgram([entryFile], {});
		this.typeChecker = this.program.getTypeChecker();
	}

	public generate() {}

	private extractControllers() {}
}
