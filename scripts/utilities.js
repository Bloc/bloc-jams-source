(function() {
    function Utilities() {
        var Utilities = {};
        
        Utilities.filterTimeCode = function(timeInSeconds) {
            var seconds = Number.parseFloat(timeInSeconds);
            var wholeSeconds = Math.floor(seconds);
            var minutes = Math.floor(wholeSeconds / 60);
            
            var remainingSeconds = wholeSeconds % 60;
            var output = minutes + ':';
            
            if (remainingSeconds < 10) {
                output += '0';   
            }
            
            output += remainingSeconds;
            return output;
        };

        return Utilities;
    }
    
    BlocJams.Utilities = Utilities();
})();
