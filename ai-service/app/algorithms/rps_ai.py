import random

CHOICES = ['rock', 'paper', 'scissors']
BEATS = {'rock': 'scissors', 'paper': 'rock', 'scissors': 'paper'}

def play(player_choice: str) -> dict:
    ai_choice = random.choice(CHOICES)
    if BEATS[player_choice] == ai_choice:
        outcome = 'win'
    elif BEATS[ai_choice] == player_choice:
        outcome = 'lose'
    else:
        outcome = 'draw'
    return {'player': player_choice, 'ai': ai_choice, 'outcome': outcome}
