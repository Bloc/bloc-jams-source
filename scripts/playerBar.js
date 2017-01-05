(function() {
    function PlayerBar() {
        var PlayerBar = {};
        
        var $durationSeekBar = $('.seek-control .seek-bar');
        var $volumeSeekBar = $('.ion-volume-high .seek-bar');
        var $currentTimeDisplay = $('.seek-control .current-time');
        var $totalTimeDisplay = $('.seek-control .total-time');
        var $playPauseButton = $('.main-controls .play-pause');
        var $previousButton = $('.main-controls .previous');
        var $nextButton = $('.main-controls .next');

        // Templates
        var playerBarPlayButton = '<span class="ion-play"></span>';
        var playerBarPauseButton = '<span class="ion-pause"></span>';
        
        var setCurrentTimeInPlayerBar = function(currentTime) {
            $currentTimeDisplay.text(Utilities.filterTimeCode(currentTime)); 
        };
        
        var setTotalTimeInPlayerBar = function(totalTime) { 
            $totalTimeDisplay.text(Utilities.filterTimeCode(totalTime)); 
        };
        
        var updatePlayerBarSong = function() {
            $('.currently-playing .song-name').text(Player.currentSong.name);
            $('.currently-playing .artist-name').text(Player.currentAlbum.artist);
            $('.currently-playing .artist-song-mobile').text(Player.currentSong.name + " - " + Player.currentAlbum.artist);
        };
        
        var togglePlayPauseButton = function() {
            if (Player.playing) {
                $playPauseButton.html(playerBarPauseButton);
            } else {
                $playPauseButton.html(playerBarPlayButton);
            }
        };
        
        PlayerBar.build = function(Player) {
            SeekBar.setupSeekBars(Player);
            $previousButton.click(Player.previousSong);
            $nextButton.click(Player.nextSong);
            $playPauseButton.click(Player.togglePlayPause);
        }
        
        PlayerBar.updateProgress = function(currentTime, songLength) {
            var currentSongPercentage = currentTime / songLength;
            
            SeekBar.update($durationSeekBar, currentSongPercentage);
            setCurrentTimeInPlayerBar(currentTime);
        }
        
        PlayerBar.update = function() {
            updatePlayerBarSong();
            setTotalTimeInPlayerBar(Player.currentSong.length);
            togglePlayPauseButton();
        };

        return PlayerBar;
    }
    
    BlocJams.PlayerBar = PlayerBar();
})();
