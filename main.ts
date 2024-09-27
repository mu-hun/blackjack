const deck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'].flatMap(
  (value: string) => Array(4).fill(value)
) as string[]

function drawCard() {
  const randomIndex = Math.floor(Math.random() * deck.length)
  return deck.splice(randomIndex, 1)[0]
}

function calculateHandValue(hand: string[]) {
  let sum = 0
  let hasAce = false

  for (const card of hand) {
    if (typeof card === 'string') {
      sum += 10 // J, Q, K는 10으로 계산
    } else if (card === 'A') {
      hasAce = true
      sum += 11 // A는 일단 11로 계산
    } else {
      sum += card
    }
  }

  // 에이스가 있고 합계가 21을 초과하면 에이스를 1로 계산
  while (hasAce && sum > 21) {
    sum -= 10
  }
  return sum
}

// 플레이어 카드 초기화
const playerHand = [drawCard(), drawCard()]
let playerScore = calculateHandValue(playerHand)

// 딜러 카드 초기화
const dealerHand = [drawCard(), drawCard()]
let dealerScore = calculateHandValue(dealerHand)

// 3. 딜러는 17점 이상일 때 멈춰야 하고, 그 이하일 때는 추가 카드를 뽑아야 함.
while (dealerScore < 17) {
  dealerHand.push(drawCard())
  dealerScore = calculateHandValue(dealerHand)
}

console.log(
  (() => {
    // 2. 플레이어가 21점을 달성하면 블랙잭 (즉시 승리).
    if (playerScore > 21) return 'You bust. Dealer wins.'
    if (dealerScore > 21) return 'Dealer busts. You win!'

    if (playerScore === 21) return 'Blackjack! You win!'

    if (dealerScore === 21) return 'Dealer Blackjack! You lose.'

    // 4. 카드 합계가 같은 경우 무승부 (Draw)
    if (playerScore === dealerScore) return 'Push (Draw)'

    if (playerScore > dealerScore) return 'You win!'
    if (playerScore < dealerScore) return 'Dealer wins.'
  })()
)
