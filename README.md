# 10FF Live WPM Script

1. [Preview](#preview)
2. [What are those numbers?](#what-are-those-numbers)
3. [Supported languages](#supported-languages)
4. [Custom Stylish theme](#custom-stylish-theme)
5. [How to Install](#how-to-install)
6. [Customization](#customization)
7. [Auto-Update](#auto-update)
8. [Bug reports, suggestions, contact](#bug-reports-suggestions-contact)

## Preview

![Preview](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/preview.png)

## What are those numbers?

All of these values are updated whenever you go to the next word (pressing space).

- The "_Speed_" value is your current speed (in WPM = Words Per Minute)
- The "_Keystrokes_" values are the number of keystrokes you hit. In green, the correct keystrokes and in red, the wrong keystrokes. On 10FF, when you typed a word wrong, all the keystrokes are considered wrong (even if you did just one mistake).
- The "_Score_" value is your current score (in WPM). If you stop the test, the score will be your final result. Your final result can not be less than the score.

## Supported languages

Here are the languages supported by the script:
- ![UK-US](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/flags/uk-us.png) English
- ![PH](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/flags/ph.png) Filipino
- ![FR](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/flags/fr.png) French
- ![ID](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/flags/id.png) Indonesian
- ![MG](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/flags/mg.png) Malagasy
- ![MY](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/flags/my.png) Malaysian

On other languages, the values displayed might not be accurate.

If you wish me to add keystrokes rules for your languages, feel free to create an issue or contact me on Discord.

## Custom Stylish theme

It supports [Stylish](https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe?hl=en) themes. The graphic appareance of the values displayed by the script will adapt depending on the style you use.

Here are some examples:

![Styles Preview](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/preview_styles.png)

## How to Install

1. Download the [tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) Chrome extension or an equivalent

2. Click on the extension, then **Create New Script**
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/1.png)
</details>

3. Copy & paste the content of the [script.js](https://github.com/wRadion/10FFLiveWPMScript/blob/master/script.js) file, and save it

4. Now you can go on https://10fastfingers.com/typing-test and toggle the script by clicking on the icon
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/2.png)
</details>

## Customization

You can change the alignment of the values by editing the `alignment` variable to `left`, `center` or `right`:

![Alignments](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/alignments.png)

<details>
  <summary>Image</summary>

  ![CustomAlignment](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/custom_align.png)
</details>

You can change the visibility of the values by editing the `*Visible` variables to `true` (visible) or `false` (collapsed):
<details>
  <summary>Image</summary>

  ![CustomVisibility](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/custom_visibility.png)
</details>

## Auto-Update

With tampermonkey, you can input an URL to the file in order to update it automatically:

1. Click on the extension, then click on the **+** icon to the right of the script, then **Edit**
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/1-1.gif)
</details>

2. Click on the **Settings** tab
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/1-2.png)
</details>

3. On the **Updates** section, copy this URL in the textbox: `https://raw.githubusercontent.com/wRadion/10FFLiveWPMScript/master/script.js`
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/1-3.png)
</details>

4. Check the **Check for updates** checkbox and click **Save**
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/1-4.png)
</details>

### Update interval

You can change the update interval in the tampermonkey settings:

1. Click on the extension, then **Dashboard**
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/2-1.png)
</details>

2. Click on **Settings** on the right
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/2-2.png)
</details>

3. In **Script Update**, you can change the **Check Interval**
<details>
  <summary>Image</summary>

  ![Image](https://github.com/wRadion/10FFLiveWPMScript/blob/master/README/auto-update/2-3.png)
</details>

## Bug reports, suggestions, contact

If you encounter a bug or have any suggestions about the script, feel free to create a github issue or contact me on Discord: **wRadion#5043**. I'm on the [offical 10FF Discord](https://discord.gg/4KypVEM) aswell, I will probably be somewhere in the _#french_ channel.

I only understand English and French, so please try to use those languages when creating an issue or contacting me.
