export class ConfusionUtil {

    constructor(data) {
        this.calculateConfusion(data);
        ConfusionUtil.self = this;
    }

    // Singleton structure so we don't calculate unnecessary stuff multiple times
    static get_instance(data) {
        if (ConfusionUtil.self == null) {
            ConfusionUtil.self = new ConfusionUtil(data);
        }
        return ConfusionUtil.self;
    }

// arrays that will be saved to the state (once!)
    allTPs = [];
    allFPs = [];
    allTNs = [];
    allFNs = [];

// thresholds[i] will represent the threshold to obtain allTPs[i], allFPs[i] etc.
    thresholds = [];

// Round to 2 decimal spaces
    round(a) {
        return Number(Math.round(a + 'e' + 2) + 'e-' + 2)
    }

// Calculate all the possible Confusion Distribution states
// Need to use the full ORES data
    calculateConfusion(data) {
        for (let i = 0; i < data.length; i++) {

            //save threshold
            this.thresholds.push(data[i].threshold);

            //necessary constants
            const filters = this.round(100 * data[i]['filter_rate']);
            const matches = this.round(100 * data[i]['match_rate']);

            //calculate confusion values
            const tp = this.round(matches * data[i]['precision']);
            const fp = this.round(matches - tp);
            const tn = this.round(filters * data[i]['!precision']);
            const fn = this.round(filters - tn);

            //fill arrays
            this.allTPs.push(tp);
            this.allFPs.push(fp);
            this.allTNs.push(tn);
            this.allFNs.push(fn);
        }
    }

// Returns the index of the wanted value
// confusionValue = 'TP', 'FP', 'TN', 'FN'
// wantedValue = 'max', 'min', int
    setConfusion(confusionValue, wantedValue) {

        //get the full array of TPs, FPs, TNs or FNs from state, depending on what Button has been clicked
        let fullArray = [];
        if (confusionValue === 'TP')
            fullArray = this.allTPs;
        else if (confusionValue === 'TN')
            fullArray = this.allTNs;
        else if (confusionValue === 'FP')
            fullArray = this.allFPs;
        else if (confusionValue === 'FN')
            fullArray = this.allFNs;

        let wantedIndex;

        if (wantedValue === 'max') {
            //get the maximum's index
            wantedIndex = fullArray.indexOf(this.arrayMax(fullArray));

        } else if (wantedValue === 'min') {
            //get the minimum's index
            wantedIndex = fullArray.indexOf(this.arrayMin(fullArray));

        } else if (this.isNumber(wantedValue)) {
            //user passed value in %
            let closest = Infinity;
            wantedIndex = 0;

            //find index of closest existing value to the one specified by user
            for (let i = 0; i < fullArray.length; i++) {
                if (Math.abs(wantedValue - fullArray[i]) < Math.abs(wantedValue - closest)) {
                    closest = fullArray[i];
                    wantedIndex = i
                }
            }
        } else {
            return
        }
        return wantedIndex;
    }

    isNumber(n) {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    }

    arrayMin(arr) {
        let len = arr.length, min = Infinity
        while (len--) {
            if (arr[len] < min) {
                min = arr[len]
            }
        }
        return min
    }

    arrayMax(arr) {
        let len = arr.length, max = -Infinity
        while (len--) {
            if (arr[len] > max) {
                max = arr[len]
            }
        }
        return max
    }

    // FINDS THE CLOSEST VALUE. Works only for sorted arrays. TPs and FPs are not sorted!!!
    bin_search(value, arr) {
        let start = 0;
        let end = arr.length - 1;
        let mid;

        let wantedIndex;
        let closest = Infinity;

        while (start <= end) {
            mid = Math.floor((start + end) / 2);

            // find the closest value
            if (Math.abs(value - arr[mid]) < Math.abs(value - closest)) {
                closest = arr[mid];
                wantedIndex = mid;
            }

            // find which way to continue the bin search
            if (arr[mid] === value)
                return mid;
            else if (arr[mid] < value)
                start = mid + 1;
            else
                end = mid - 1;
        }

        return wantedIndex;
    }
}
