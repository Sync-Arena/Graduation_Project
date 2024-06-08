class Contestant {
    constructor(userId, contestId, rank, points, rating) {
        this.userId = userId
        this.contestId = contestId
        this.rank = rank
        this.points = points
        this.rating = rating
        this.delta = 0
        this.seed = 0
        this.needRating = 0
    }
}

function getEloWinProbability(ra, rb) {
    return 1.0 / (1 + Math.pow(10, (rb - ra) / 400.0))
}

function getEloWinProbabilityContestant(a, b) {
    return getEloWinProbability(a.rating, b.rating)
}

function getSeed(contestants, rating) {
    let extraContestant = new Contestant(null, null, 0, 0, rating)

    let result = 1
    for (let other of contestants) {
        result += getEloWinProbabilityContestant(other, extraContestant)
    }

    return result
}

function getRatingToRank(contestants, rank) {
    let left = 1
    let right = 8000

    while (right - left > 1) {
        let mid = Math.floor((left + right) / 2)

        if (getSeed(contestants, mid) < rank) {
            right = mid
        } else {
            left = mid
        }
    }

    return left
}

function reassignRanks(contestants) {
    contestants.sort((o1, o2) => o2.points - o1.points)

    for (let contestant of contestants) {
        contestant.rank = 0
        contestant.delta = 0
    }

    let first = 0
    let points = contestants[0].points
    for (let i = 1; i < contestants.length; i++) {
        if (contestants[i].points < points) {
            for (let j = first; j < i; j++) {
                contestants[j].rank = i
            }
            first = i
            points = contestants[i].points
        }
    }

    let rank = contestants.length
    for (let j = first; j < contestants.length; j++) {
        contestants[j].rank = rank
    }
}

function sortByPointsDesc(contestants) {
    contestants.sort((o1, o2) => o2.points - o1.points)
}

function sortByRatingDesc(contestants) {
    contestants.sort((o1, o2) => o2.rating - o1.rating)
}

function process(contestants) {
    if (contestants.length === 0) {
        return
    }

    reassignRanks(contestants)

    for (let a of contestants) {
        a.seed = 1
        for (let b of contestants) {
            if (a !== b) {
                a.seed += getEloWinProbabilityContestant(b, a)
            }
        }
    }

    for (let contestant of contestants) {
        let midRank = Math.sqrt(contestant.rank * contestant.seed)
        contestant.needRating = getRatingToRank(contestants, midRank)
        contestant.delta = (contestant.needRating - contestant.rating) / 2
    }

    sortByRatingDesc(contestants)

    // Total sum should not be more than zero.
    {
        let sum = 0
        for (let c of contestants) {
            sum += c.delta
        }
        let inc = -Math.floor(sum / contestants.length) - 1
        for (let contestant of contestants) {
            contestant.delta += inc
        }
    }

    // Sum of top-4*sqrt should be adjusted to zero.
    {
        let sum = 0
        let zeroSumCount = Math.min(Math.floor(4 * Math.sqrt(contestants.length)), contestants.length)
        for (let i = 0; i < zeroSumCount; i++) {
            sum += contestants[i].delta
        }
        let inc = Math.min(Math.max(-Math.floor(sum / zeroSumCount), -10), 0)
        for (let contestant of contestants) {
            contestant.delta += inc
        }
    }
}
//users must contain user.userId,user.rank,user.points,user.rating
function calculateRatingChanges(users, contestId) {
    let contestants = users.map((user) => new Contestant(user.userId, contestId, user.rank, user.points, user.rating))
    process(contestants)

    let ratingChanges = {}
    for (let contestant of contestants) {
        if (!ratingChanges[contestant.userId]) {
            ratingChanges[contestant.userId] = {}
        }
        ratingChanges[contestant.userId][contestant.contestId] = contestant.delta
    }

    return ratingChanges
}
