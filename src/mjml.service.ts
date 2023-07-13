import { Injectable } from '@nestjs/common';
import mjml2html from 'mjml';

export type RenderResponse = SuccessfulRenderResponse | ErrorRenderResponse;

export type SuccessfulRenderResponse = {
  html: string;
};
export const isSuccessfulRender = (data: RenderResponse): data is SuccessfulRenderResponse => {
  return 'html' in data;
};

type RenderingError = {
  message: string;
  line?: number;
};

export type ErrorRenderResponse = {
  errors: RenderingError[];
};
export const isErrorRender = (data: RenderResponse): data is ErrorRenderResponse => {
  return 'errors' in data;
};

type MjmlValidationError = {
  errors: {
    line: number;
    message: string;
    tagName: string;
    formattedMessage: string;
  }[];
};
const isMjmlValidationError = (error: unknown): error is MjmlValidationError => {
  return error instanceof Error && 'errors' in error;
};

@Injectable()
export class MjmlService {
  render(mjml: string): RenderResponse {
    try {
      const result = mjml2html(mjml, {
        validationLevel: 'strict',
      });

      return {
        html: result.html,
      };
    } catch (e) {
      return {
        errors: this.handleRenderError(e),
      };
    }
  }

  private handleRenderError(error: unknown): RenderingError[] {
    if (isMjmlValidationError(error)) {
      return error.errors.map((it) => {
        return {
          message: it.message,
          line: it.line,
        };
      });
    } else if (error instanceof Error) {
      return [{ message: error.message }];
    } else {
      return [{ message: String(error) }];
    }
  }
}
