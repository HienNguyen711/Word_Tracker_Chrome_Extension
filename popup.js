$(function () {
    chrome.storage.sync.get(['words', 'goal'], function (items) {
        $('#words').text(items.words);
        $('#goal').text(items.goal);
    });


    $('#addWord').click(function () {
        chrome.storage.sync.get(['words', 'goal'], function (items) {
            var newWords = "";
            if (items.words) {
                newWords += items.words+" ";
            }

            var word = $('#word').val();
            if (word) {
                newWords += word+" ";
            }

            chrome.storage.sync.set({
                'words': newWords
            });
            $('#words').text(newWords);
            $('#word').val('');

            var checkLength = newWords.split(' ');

            if (checkLength.length > items.goal) {
                var opt = {
                    type: "basic",
                    title: "Goal reached!",
                    message: "You reached your goal of " + items.goal + "!",
                    iconUrl: "icon.png"
                }

                chrome.notifications.create('goalReached', opt, function () {});
            }
        });
    });
});
