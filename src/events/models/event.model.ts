import { Field, ObjectType, ID, registerEnumType, createUnionType } from '@nestjs/graphql';

export enum ComponentType {
  TITLE = 'TITLE',
  IMAGE = 'IMAGE',
  FLOATING_BUTTON = 'FLOATING_BUTTON',
  IMAGE_WITH_BUTTON = 'IMAGE_WITH_BUTTON',
  BUTTON = 'BUTTON',
  BUTTON_GROUP = 'BUTTON_GROUP',
  FOOTER = 'FOOTER',
  LIST = 'LIST',
  SPLIT = 'SPLIT',
  CAROUSEL = 'CAROUSEL',
}

registerEnumType(ComponentType, {
  name: 'ComponentType',
});

@ObjectType()
export class TitleComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field()
  text: string;

  @Field({ nullable: true })
  fontSize?: number;

  @Field({ nullable: true })
  fontWeight?: string;

  @Field({ nullable: true })
  textAlign?: string;

  @Field({ nullable: true })
  color?: string;
}

@ObjectType()
export class ImageComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field()
  imageUrl: string;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  textAlign?: string;

  @Field({ nullable: true })
  width?: string;

  @Field({ nullable: true })
  height?: string;
}

@ObjectType()
export class FloatingButtonComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field()
  text: string;

  @Field()
  backgroundColor: string;

  @Field({ nullable: true })
  textColor?: string;

  @Field({ nullable: true })
  bottom?: number;

  @Field()
  onClick: string;

  @Field({ nullable: true })
  width?: string;

  @Field({ nullable: true })
  height?: string;

  @Field({ nullable: true })
  fontSize?: number;

  @Field({ nullable: true })
  fontWeight?: string;
}

@ObjectType()
export class ImageWithButtonComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  paddingTop?: number;

  @Field({ nullable: true })
  paddingBottom?: number;

  @Field({ nullable: true })
  paddingLeft?: number;

  @Field({ nullable: true })
  paddingRight?: number;

  @Field(() => [ComponentUnion], { nullable: true })
  children?: Array<typeof ComponentUnion>;
}

@ObjectType()
export class CarouselComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  paddingTop?: number;

  @Field({ nullable: true })
  paddingBottom?: number;

  @Field({ nullable: true })
  paddingLeft?: number;

  @Field({ nullable: true })
  paddingRight?: number;

  @Field(() => [ComponentUnion], { nullable: true })
  children?: Array<typeof ComponentUnion>;
}

@ObjectType()
export class ButtonComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field()
  text: string;

  @Field({ nullable: true })
  buttonColor?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  width?: string;

  @Field({ nullable: true })
  height?: string;

  @Field({ nullable: true })
  fontSize?: number;

  @Field({ nullable: true })
  fontWeight?: string;

  @Field({ nullable: true })
  borderRadius?: string;

  @Field()
  onClick: string;
}

@ObjectType()
export class FooterComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field()
  text: string;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  fontSize?: number;

  @Field({ nullable: true })
  fontWeight?: string;

  @Field({ nullable: true })
  textAlign?: string;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  paddingTop?: number;

  @Field({ nullable: true })
  paddingBottom?: number;

  @Field({ nullable: true })
  paddingLeft?: number;

  @Field({ nullable: true })
  paddingRight?: number;

  @Field({ nullable: true })
  display?: string;

  @Field({ nullable: true })
  flexDirection?: string;

  @Field({ nullable: true })
  gap?: string;

  @Field(() => [ComponentUnion], { nullable: true })
  children?: Array<typeof ComponentUnion>;
}

@ObjectType()
export class SplitComponent {
  @Field(() => ComponentType)
  type: ComponentType;

  @Field({ nullable: true })
  backgroundColor?: string;

  @Field({ nullable: true })
  paddingTop?: string;

  @Field({ nullable: true })
  paddingBottom?: string;

  @Field({ nullable: true })
  paddingLeft?: string;

  @Field({ nullable: true })
  paddingRight?: string;
}

/** to define Union type */
export const ComponentUnion = createUnionType({
  name: 'ComponentUnion',
  types: () =>
    [
      TitleComponent,
      ImageComponent,
      FloatingButtonComponent,
      ImageWithButtonComponent,
      CarouselComponent,
      ButtonComponent,
      FooterComponent,
      SplitComponent,
    ] as const,
  resolveType(value) {
    if (value.type === ComponentType.TITLE) return TitleComponent.name;
    if (value.type === ComponentType.IMAGE) return ImageComponent.name;
    if (value.type === ComponentType.FLOATING_BUTTON) return FloatingButtonComponent.name;
    if (value.type === ComponentType.IMAGE_WITH_BUTTON) return ImageWithButtonComponent.name;
    if (value.type === ComponentType.CAROUSEL) return CarouselComponent.name;
    if (value.type === ComponentType.BUTTON) return ButtonComponent.name;
    if (value.type === ComponentType.FOOTER) return FooterComponent.name;
    if (value.type === ComponentType.SPLIT) return SplitComponent.name;
  },
});

/** to get a component type dynamically */
@ObjectType()
export class ComponentResponse {
  @Field()
  resultCode: string;

  @Field()
  resultMessage: string;

  @Field(() => ID)
  eventId: string;

  @Field(() => [ComponentUnion])
  components: Array<typeof ComponentUnion>;
}
