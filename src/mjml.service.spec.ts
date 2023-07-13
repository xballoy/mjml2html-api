import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { beforeEach, describe, expect, it } from 'vitest';
import { isErrorRender, isSuccessfulRender, MjmlService } from './mjml.service';

describe('MJML service', () => {
  let underTest: MjmlService;
  let mjml: string;

  const readFixture = async (filename: string) => {
    return readFile(join(__dirname, '..', 'fixtures', filename), 'utf-8');
  };

  beforeEach(() => {
    underTest = new MjmlService();
  });

  describe('when valid MJML', () => {
    beforeEach(async () => {
      mjml = await readFixture('valid.mjml');
    });

    it('should return rendered HTML', () => {
      const result = underTest.render(mjml);

      if (!isSuccessfulRender(result)) {
        fail('should be successful render');
      }

      expect(result.html).toMatchSnapshot();
    });
  });

  describe('when invalid MJML tags', () => {
    beforeEach(async () => {
      mjml = await readFixture('invalid-tag.mjml');
    });

    it('should return errors', () => {
      const result = underTest.render(mjml);

      if (!isErrorRender(result)) {
        fail('should be error render');
      }

      expect(result.errors).toEqual([
        {
          line: 2,
          message: "Element invalid-tag doesn't exist or is not registered",
        },
        {
          line: 3,
          message: "Element another-invalid-tag doesn't exist or is not registered",
        },
      ]);
    });
  });

  describe('when invalid MJML', () => {
    beforeEach(async () => {
      mjml = await readFixture('invalid.mjml');
    });

    it('should return errors', () => {
      const result = underTest.render(mjml);

      if (!isErrorRender(result)) {
        fail('should be error render');
      }

      expect(result.errors).toEqual([
        {
          message: 'Parsing failed. Check your mjml.',
        },
      ]);
    });
  });
});
