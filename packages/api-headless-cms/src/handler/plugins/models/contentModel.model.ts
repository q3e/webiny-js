import { validation } from "@webiny/validation";
import { pipe, withFields, string, withName, fields, object, boolean } from "@webiny/commodo";
import { i18nString } from "@webiny/api-i18n/fields";

const required = validation.create("required");

export default ({ createBase, context }) => {
    return pipe(
        withName(`CmsContentModel_${context.cms.environment}`),
        withFields({
            title: string({ validation: required }),
            modelId: string({ validation: required }),
            description: string(),
            layout: object({ value: [] }),
            // group: ref({ instanceOf: CmsContentModelGroup, validation: required }),
            fields: fields({
                list: true,
                value: [],
                instanceOf: withFields({
                    _id: string({ validation: required }),
                    fieldId: string({ validation: required }),
                    label: i18nString({ context, validation: required }),
                    helpText: i18nString({ context }),
                    placeholderText: i18nString({ context }),
                    type: string({ validation: required }),
                    localization: boolean({ validation: required }),
                    unique: boolean({ validation: required }),
                    validation: fields({
                        list: true,
                        value: [],
                        instanceOf: withFields({
                            name: string({ validation: required }),
                            message: i18nString({ context }),
                            settings: object({ value: {} })
                        })()
                    }),
                    settings: object({ value: {} })
                })()
            })
        })
    )(createBase());
};