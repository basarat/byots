import * as utils from "./utils";

/**
 * Fixes
 */
const fixesForFiles: utils.FixesForFile[] = [
  /** 
   * Tsconfig expose internal
   */
  {
    filePath: '../TypeScript/src/tsconfig-library-base.json',
    fixes: [
      {
        orig: '"stripInternal":  true',
        new: '"stripInternal":  false'
      }
    ]
  },
  /** 
   * Code expose internal
   */
  {
    filePath: '../TypeScript/src/services/refactors/extractSymbol.ts',
    fixes: [
      {
        orig: 'const enum Usage',
        new: 'export const enum Usage'
      },
      {
        orig: 'type RangeToExtract',
        new: 'export type RangeToExtract'
      },
      {
        orig: 'interface TargetRange',
        new: 'export interface TargetRange'
      },
      {
        orig: 'enum RangeFacts',
        new: 'export enum RangeFacts'
      },
    ],
  },
  {
    filePath: '../TypeScript/src/services/formatting/rulesMap.ts',
    fixes: [
      {
        orig: 'enum RulesPosition',
        new: 'export enum RulesPosition'
      }
    ]
  },
  {
    filePath: '../TypeScript/src/services/codefixes/annotateWithTypeFromJSDoc.ts',
    fixes: [
      {
        orig: 'type DeclarationWithType',
        new: 'export type DeclarationWithType'
      },
    ]
  },
  {
    filePath: '../TypeScript/src/services/codefixes/importFixes.ts',
    fixes: [
      {
        orig: 'const enum ImportKind',
        new: 'export const enum ImportKind'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/services/symbolDisplay.ts',
    fixes: [
      {
        orig: 'interface SymbolDisplayPartsDocumentationAndSymbolKind',
        new: 'export interface SymbolDisplayPartsDocumentationAndSymbolKind'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/compiler/watchUtilities.ts',
    fixes: [
      {
        orig: 'interface FileAndDirectoryExistence',
        new: 'export interface FileAndDirectoryExistence'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/compiler/parser.ts',
    fixes: [
      {
        orig: 'type PragmaDiagnosticReporter',
        new: 'export type PragmaDiagnosticReporter'
      },
    ]
  },
  {
    filePath:'../TypeScript/src/compiler/types.ts',
    fixes: [
      {
        orig: 'interface PragmaArgumentSpecification',
        new: 'export interface PragmaArgumentSpecification'
      },
      {
        orig: 'type ConcretePragmaSpecs',
        new: 'export type ConcretePragmaSpecs'
      },
      {
        orig: 'type PragmaArgumentType',
        new: 'export type PragmaArgumentType'
      },
      {
        orig: 'type PragmaArgTypeOptional',
        new: 'export type PragmaArgTypeOptional'
      },
      {
        orig: 'type PragmaArgTypeMaybeCapture',
        new: 'export type PragmaArgTypeMaybeCapture'
      },
    ]
  },
];

/**
 * Run the fixes
 */
utils.runFixesforFiles(fixesForFiles);
