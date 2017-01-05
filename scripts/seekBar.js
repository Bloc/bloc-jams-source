(function() {
    function SeekBar() {
        var SeekBar = {};
        
        // var $durationSeekBar = $('.seek-control .seek-bar');
        // var $volumeSeekBar = $('.ion-volume-high .seek-bar');

        var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
            var offsetXPercent = seekBarFillRatio * 100;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(100, offsetXPercent);
            
            var percentageString = offsetXPercent + '%';
            Seekbar.$seekbar.find('.fill').width(percentageString);
            Seekbar.$seekbar.find('.thumb').css({left: percentageString});
        };
        
        var seekBarFillRatio = function($item) {
            var offsetX = event.pageX - $item.offset().left;
            var barWidth = $item.width();
            return seekBarFillRatio = offsetX / barWidth;
        }
        
        SeekBar.update = function($seekBar, seekBarFillRatio) {
            updateSeekPercentage($seekBar, seekBarFillRatio);
        }
        
        SeekBar.setupSeekBar = function(Player, seekbar, callback) {
            Seekbar.$seekbar = seekbar;
            Seekbar.callback = callback;
            
            Seekbar.$seekbar.click(function(event) {
                Seekbar.callback(seekBarFillRatio($(this)));
                
                updateSeekPercentage($(this), seekBarFillRatio);
            });
            
            Seekbar.$seekbar.find('.thumb').mousedown(function(event) {
                var $seekBar = $(this).parent();
                
                $(document).bind('mousemove.thumb', function(event){
                    Seekbar.callback(seekBarFillRatio($seekBar));
                    
                    updateSeekPercentage($seekBar, seekBarFillRatio);
                });
                
                $(document).bind('mouseup.thumb', function() {
                    $(document).unbind('mousemove.thumb');
                    $(document).unbind('mouseup.thumb');
                });
            });
        }
        
        SeekBar.setupSeekBars = function(Player) {
            
            var $seekBars = $('.player-bar .seek-bar');
            
            $seekBars.click(function(event) {
                var offsetX = event.pageX - $(this).offset().left;
                var barWidth = $(this).width();
                var seekBarFillRatio = offsetX / barWidth;
                
                if ($(this).parent().attr('class') == 'seek-control') {
                    var newTime = seekBarFillRatio * Player.currentSoundFile.getDuration()
                    Player.moveTo(newTime);
                } else {
                    Player.setVolume(seekBarFillRatio * 100);   
                }
                
                updateSeekPercentage($(this), seekBarFillRatio);
            });
            
            $seekBars.find('.thumb').mousedown(function(event) {
                var $seekBar = $(this).parent();
                
                $(document).bind('mousemove.thumb', function(event){
                    var offsetX = event.pageX - $seekBar.offset().left;
                    var barWidth = $seekBar.width();
                    var seekBarFillRatio = offsetX / barWidth;
                    
                    if ($seekBar.parent().attr('class') == 'seek-control') {
                        var newTime = seekBarFillRatio * Player.currentSoundFile.getDuration()
                        Player.moveTo(newTime);   
                    } else {
                        Player.setVolume(seekBarFillRatio);
                    }
                    updateSeekPercentage($seekBar, seekBarFillRatio);
                });
                
                $(document).bind('mouseup.thumb', function() {
                    $(document).unbind('mousemove.thumb');
                    $(document).unbind('mouseup.thumb');
                });
            });
        };

        return SeekBar;
    }
    
    BlocJams.SeekBar = SeekBar();
})();
