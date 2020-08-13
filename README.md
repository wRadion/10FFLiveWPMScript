# 10FF Live WPM Script

1. [Preview](#preview)
2. [What are those numbers?](#what-are-those-numbers)
3. [Supported languages](#supported-languages)
4. [Custom Stylish theme](#custom-stylish-theme)
5. [How to Install](#how-to-install)
6. [Customization](#customization)
7. [Bug reports, suggestions, contact](#bug-reports-suggestions-contact)

## Preview

![Preview](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/preview.png)

## What are those numbers?

All of these values are updated whenever you go to the next word (pressing space).

- The "_Speed_" value is your current speed (in WPM = Words Per Minute)
- The "_Keystrokes_" values are the number of keystrokes you hit. In green, the correct keystrokes and in red, the wrong keystrokes. On 10FF, when you typed a word wrong, all the keystrokes are considered wrong (even if you did just one mistake).
- The "_Score_" value is your current score (in WPM). If you stop the test, the score will be your final result. Your final result can not be less than the score.

## Supported languages

Here are the languages supported by the script:
- ![UK-US](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/flags/uk-us.png) English
- ![PH](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/flags/ph.png) Filipino
- ![FR](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/flags/fr.png) French
- ![ID](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/flags/id.png) Indonesian
- ![MG](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/flags/mg.png) Malagasy
- ![MY](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/flags/my.png) Malaysian

On other languages, the values displayed might not be accurate.

If you wish me to add keystrokes rules for your languages, feel free to create an issue or contact me on Discord.

## Custom Styligh theme

It supports [Stylish](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) themes. The graphic appareance of the values displayed by the script will adapt depending on the style you use.

Here are some examples:

![Styles Preview](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/preview_styles.png)


## How to Install

1. Download the [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) Chrome extension or an equivalent.

2. Click on the extension, then **Create New Script**.

![Image](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/1.png)

3. Copy & paste the content of the [script.js](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/script.js) file, and save it.

4. Now you can go on https://10fastfingers.com/typing-test and toggle the script by clicking on the icon.

![Image](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/2.png)

## Customization

You can change the alignment of the values by editing the `alignment` variable to `left`, `center` or `right`:

![CustomAlignment](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/custom_align.png)

You can change the visibility of the values by editing the `*Visibility` variables to `visible` or `hidden`:

![CustomVisbility](https://github.com/wRadion/10ff_LiveWPMScript/blob/master/README/custom_visibility.png)

## Bug reports, suggestions, contact

If you encounter a bug or have any suggestions about the script, feel free to create a github issue or contact me on Discord: **wRadion#5043**. I'm on the [offical 10FF Discord](https://discord.gg/4KypVEM) aswell, I will probably be somewhere in the #french channel.

I only understand English and French, so please try to use those languages when creating an issue or contacting me.
