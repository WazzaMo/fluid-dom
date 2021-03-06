/*
 * Fluid DOM for JavaScript
 * (c) Copyright 2018 Warwick Molloy
 * Available under the MIT License
 */

export enum LocatedBy  {
  FailedToLocate = 'Failed to locate',
  Id = 'id',
  Selector = 'selector',
  Class = 'class',
  TagName = 'tagName',
  ConstructedWithElement = 'from given element',
  ConstructedWithChildren = 'from given list of children'
}

export enum Tag {
  Button = 'BUTTON',
  Div = 'DIV',
  Input = 'INPUT',
  Paragraph = 'P'
}