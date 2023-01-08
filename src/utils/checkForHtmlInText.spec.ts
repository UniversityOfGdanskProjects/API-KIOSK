import { checkForHtmlInText } from './checkForHtmlInText';

describe('checkForHtmlInText', () => {
    it('li tag occurs in the string argument', () => {
        const text =
            '<li>\n\taparaty promieniolecznictwa dermatologicznego.</li>';

        expect(checkForHtmlInText(text) === true).toBeTruthy();
    });

    // TODO
    // it('a tag occurs in the string argument', () => {
    //     const text =
    //         'Aktualną siatkę studiów, wraz z rozpiską przedmiotów i sylabusami znajdziesz <a href="https://mfi.ug.edu.pl/studenci/plany_zajec_2/bioinformatyka">TUTAJ</a>.';

    //     expect(checkForHtmlInText(text) === true).toBeTruthy();
    // });

    it('no html tag occurs in the string argument', () => {
        const text =
            'zarządzanie dużym projektem informatycznym, połączone z umiejętnością posługiwania się systemem kontroli wersji';

        expect(checkForHtmlInText(text) === false).toBeTruthy();
    });
});
