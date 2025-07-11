/* tslint:disable */
/* eslint-disable */
// Generated by Microsoft Kiota
// @ts-ignore
import { createResultProblemFromDiscriminatorValue, serializeRunCommandRequest, type ResultProblem, type RunCommandRequest } from '../models/index.js';
// @ts-ignore
import { type BaseRequestBuilder, type Parsable, type ParsableFactory, type RequestConfiguration, type RequestInformation, type RequestsMetadata } from '@microsoft/kiota-abstractions';

/**
 * Builds and executes requests for operations under /run-command
 */
export interface RunCommandRequestBuilder extends BaseRequestBuilder<RunCommandRequestBuilder> {
    /**
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {Promise<ArrayBuffer>}
     * @throws {ResultProblem} error when the service returns a 400 status code
     */
     post(body: RunCommandRequest, requestConfiguration?: RequestConfiguration<object> | undefined) : Promise<ArrayBuffer | undefined>;
    /**
     * @param body The request body
     * @param requestConfiguration Configuration for the request such as headers, query parameters, and middleware options.
     * @returns {RequestInformation}
     */
     toPostRequestInformation(body: RunCommandRequest, requestConfiguration?: RequestConfiguration<object> | undefined) : RequestInformation;
}
/**
 * Uri template for the request builder.
 */
export const RunCommandRequestBuilderUriTemplate = "{+baseurl}/run-command";
/**
 * Metadata for all the requests in the request builder.
 */
export const RunCommandRequestBuilderRequestsMetadata: RequestsMetadata = {
    post: {
        uriTemplate: RunCommandRequestBuilderUriTemplate,
        responseBodyContentType: "application/json",
        errorMappings: {
            400: createResultProblemFromDiscriminatorValue as ParsableFactory<Parsable>,
        },
        adapterMethodName: "sendPrimitive",
        responseBodyFactory:  "ArrayBuffer",
        requestBodyContentType: "application/json",
        requestBodySerializer: serializeRunCommandRequest,
        requestInformationContentSetMethod: "setContentFromParsable",
    },
};
/* tslint:enable */
/* eslint-enable */
