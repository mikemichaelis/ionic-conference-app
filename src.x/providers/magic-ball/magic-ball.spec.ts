// https://github.com/Microsoft/vscode-chrome-debug
// https://github.com/karma-runner/karma-chrome-launcher
// http://blog.mlewandowski.com/Debugging-Karma-tests-with-VSCode.html

// https://www.joshmorony.com/introduction-to-testing-ionic-2-applications-with-testbed/
// https://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/
import {} from 'jasmine';
import { MagicBallProvider } from './magic-ball';
 
let magicBall = null;
 
describe('Magic 8 Ball Service', () => {
 
    beforeEach(() => {
      magicBall = new MagicBallProvider();
    });
 
    it('should return a non empty array', () => {
 
            let result = magicBall.getAnswers(); 
  
            expect(Array.isArray(result)).toBeTruthy;
            expect(result.length).toBeGreaterThan(0);
        });
 
    it('should return one random answer as a string', () => {
            expect(typeof magicBall.getRandomAnswer()).toBe('string');
        });
 
    it('should have both yes and no available in result set', () => {
 
            let result = magicBall.getAnswers();
 
            expect(result).toContain('Yes');
            expect(result).toContain('No');
 
        });
 
});