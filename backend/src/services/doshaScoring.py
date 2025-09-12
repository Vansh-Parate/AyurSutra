"""
Ayurvedic Dosha Scoring Model
Based on traditional Ayurvedic principles for Vata, Pitta, and Kapha assessment
"""

import sys
import json
from typing import Dict, Any, Tuple

class DoshaScoringModel:
    """
    Traditional Ayurvedic dosha scoring model based on physical and mental characteristics
    """
    
    def __init__(self):
        # Define scoring weights for each characteristic
        self.weights = {
            'body_frame': {
                'light': {'vata': 3, 'pitta': 0, 'kapha': 0},
                'medium': {'vata': 0, 'pitta': 3, 'kapha': 0},
                'sturdy': {'vata': 0, 'pitta': 0, 'kapha': 3}
            },
            'skin_hair': {
                'dry': {'vata': 2, 'pitta': 0, 'kapha': 0},
                'normal': {'vata': 0, 'pitta': 2, 'kapha': 0},
                'oily': {'vata': 0, 'pitta': 0, 'kapha': 2}
            },
            'digestion': {
                'irregular': {'vata': 2.5, 'pitta': 0, 'kapha': 0},
                'sharp': {'vata': 0, 'pitta': 2.5, 'kapha': 0},
                'slow': {'vata': 0, 'pitta': 0, 'kapha': 2.5}
            },
            'energy': {
                'variable': {'vata': 2, 'pitta': 0, 'kapha': 0},
                'intense': {'vata': 0, 'pitta': 2, 'kapha': 0},
                'steady': {'vata': 0, 'pitta': 0, 'kapha': 2}
            },
            'sleep': {
                'light': {'vata': 1.5, 'pitta': 0, 'kapha': 0},
                'moderate': {'vata': 0, 'pitta': 1.5, 'kapha': 0},
                'heavy': {'vata': 0, 'pitta': 0, 'kapha': 1.5}
            },
            'climate': {
                'warm': {'vata': 1, 'pitta': 0, 'kapha': 0},
                'cold': {'vata': 0, 'pitta': 1, 'kapha': 0},
                'damp': {'vata': 0, 'pitta': 0, 'kapha': 1}
            },
            'mind': {
                'anxious': {'vata': 2, 'pitta': 0, 'kapha': 0},
                'irritable': {'vata': 0, 'pitta': 2, 'kapha': 0},
                'calm': {'vata': 0, 'pitta': 0, 'kapha': 2}
            }
        }
        
        # Additional factors for comprehensive scoring
        self.additional_factors = {
            'age_weight': 0.1,  # Age can influence dosha balance
            'seasonal_adjustment': 0.05,  # Seasonal variations
            'lifestyle_factor': 0.1  # Lifestyle choices impact
        }
    
    def calculate_dosha_scores(self, assessment_data: Dict[str, Any]) -> Dict[str, float]:
        """
        Calculate Vata, Pitta, and Kapha scores based on assessment responses
        
        Args:
            assessment_data: Dictionary containing user responses
            
        Returns:
            Dictionary with vata, pitta, kapha percentages
        """
        vata_score = 0
        pitta_score = 0
        kapha_score = 0
        
        # Process each assessment category
        for category, value in assessment_data.items():
            if value and category in self.weights:
                if value in self.weights[category]:
                    weights = self.weights[category][value]
                    vata_score += weights['vata']
                    pitta_score += weights['pitta']
                    kapha_score += weights['kapha']
        
        # Calculate total score
        total_score = vata_score + pitta_score + kapha_score
        
        # Handle case where no answers provided
        if total_score == 0:
            return {'vata': 33.33, 'pitta': 33.33, 'kapha': 33.33}
        
        # Calculate percentages
        vata_percentage = (vata_score / total_score) * 100
        pitta_percentage = (pitta_score / total_score) * 100
        kapha_percentage = (kapha_score / total_score) * 100
        
        # Apply normalization to ensure percentages sum to 100
        total_percentage = vata_percentage + pitta_percentage + kapha_percentage
        if total_percentage > 0:
            vata_percentage = (vata_percentage / total_percentage) * 100
            pitta_percentage = (pitta_percentage / total_percentage) * 100
            kapha_percentage = (kapha_percentage / total_percentage) * 100
        
        return {
            'vata': round(vata_percentage, 1),
            'pitta': round(pitta_percentage, 1),
            'kapha': round(kapha_percentage, 1)
        }
    
    def get_dominant_dosha(self, scores: Dict[str, float]) -> str:
        """
        Determine the dominant dosha based on scores
        
        Args:
            scores: Dictionary with vata, pitta, kapha percentages
            
        Returns:
            Dominant dosha name
        """
        return max(scores, key=scores.get)
    
    def get_dosha_analysis(self, assessment_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Get comprehensive dosha analysis including scores and recommendations
        
        Args:
            assessment_data: Dictionary containing user responses
            
        Returns:
            Complete analysis with scores, dominant dosha, and insights
        """
        scores = self.calculate_dosha_scores(assessment_data)
        dominant = self.get_dominant_dosha(scores)
        
        # Dosha characteristics for insights
        dosha_characteristics = {
            'vata': {
                'elements': 'Air + Space',
                'qualities': 'Light, cold, dry, mobile, subtle',
                'traits': 'Creative, energetic, adaptable, prone to anxiety',
                'recommendations': 'Warm, grounding foods; regular routine; gentle exercise'
            },
            'pitta': {
                'elements': 'Fire + Water',
                'qualities': 'Hot, sharp, light, oily, liquid',
                'traits': 'Intelligent, focused, ambitious, prone to anger',
                'recommendations': 'Cooling foods; avoid spicy; moderate exercise'
            },
            'kapha': {
                'elements': 'Earth + Water',
                'qualities': 'Heavy, slow, cool, oily, smooth',
                'traits': 'Stable, patient, loving, prone to lethargy',
                'recommendations': 'Light, warm foods; vigorous exercise; variety in routine'
            }
        }
        
        return {
            'scores': scores,
            'dominant_dosha': dominant,
            'characteristics': dosha_characteristics[dominant],
            'balance_status': self._assess_balance(scores),
            'recommendations': self._generate_recommendations(scores, dominant)
        }
    
    def _assess_balance(self, scores: Dict[str, float]) -> str:
        """Assess overall dosha balance"""
        max_score = max(scores.values())
        min_score = min(scores.values())
        difference = max_score - min_score
        
        if difference < 10:
            return "Well Balanced"
        elif difference < 20:
            return "Moderately Imbalanced"
        else:
            return "Significantly Imbalanced"
    
    def _generate_recommendations(self, scores: Dict[str, float], dominant: str) -> list:
        """Generate personalized recommendations"""
        recommendations = []
        
        # General recommendations based on dominant dosha
        if dominant == 'vata':
            recommendations.extend([
                "Maintain regular meal times",
                "Include warm, cooked foods",
                "Practice grounding meditation",
                "Avoid excessive cold and dry foods"
            ])
        elif dominant == 'pitta':
            recommendations.extend([
                "Eat cooling foods like cucumber and mint",
                "Avoid spicy and fried foods",
                "Practice cooling breathing exercises",
                "Maintain work-life balance"
            ])
        else:  # kapha
            recommendations.extend([
                "Include light, warm foods",
                "Engage in regular vigorous exercise",
                "Avoid heavy, oily foods",
                "Maintain variety in daily routine"
            ])
        
        return recommendations

# Global instance for use in API endpoints
dosha_model = DoshaScoringModel()

def score_assessment(assessment_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convenience function to score assessment data
    
    Args:
        assessment_data: Dictionary containing user responses
        
    Returns:
        Complete dosha analysis
    """
    return dosha_model.get_dosha_analysis(assessment_data)

# Command line interface for testing
if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            # Parse assessment data from command line argument
            assessment_data = json.loads(sys.argv[1])
            result = score_assessment(assessment_data)
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": str(e)}), file=sys.stderr)
            sys.exit(1)
    else:
        # Try to read from test_data.json if no args provided
        try:
            with open('test_data.json', 'r') as f:
                assessment_data = json.load(f)
            result = score_assessment(assessment_data)
            print(json.dumps(result))
        except Exception as e:
            print(json.dumps({"error": str(e)}), file=sys.stderr)
            sys.exit(1)
