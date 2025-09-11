const UserService = require('../services/userService');

// Get patient dashboard data
const getPatientDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Mock data for patient dashboard
    // In a real application, you would fetch this from your database
    const dashboardData = {
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role
      },
      currentTreatment: {
        name: "21-day Panchakarma Program",
        day: 8,
        totalDays: 21,
        progress: 38,
        nextAppointment: {
          date: "Tomorrow",
          time: "10:00 AM",
          treatment: "Abhyanga Therapy",
          practitioner: "Dr. Priya Sharma"
        }
      },
      quickActions: [
        { id: 1, name: "Book Appointment", type: "primary" },
        { id: 2, name: "Check Progress", type: "secondary" },
        { id: 3, name: "View Treatment Plan", type: "secondary" }
      ],
      recentActivity: [
        {
          id: 1,
          type: "treatment_completed",
          message: "Completed Abhyanga session",
          timestamp: "2 hours ago",
          status: "completed"
        },
        {
          id: 2,
          type: "progress_checkin",
          message: "Progress check-in submitted",
          timestamp: "1 day ago",
          status: "completed"
        },
        {
          id: 3,
          type: "appointment_scheduled",
          message: "Appointment scheduled",
          timestamp: "3 days ago",
          status: "scheduled"
        }
      ],
      aiRecommendations: [
        {
          id: 1,
          type: "treatment_suggestion",
          title: "Personalized Treatment Suggestion",
          description: "Based on your Vata constitution and current progress, we recommend adding Shirodhara therapy to your treatment plan. This will help balance your nervous system and improve sleep quality.",
          priority: "high"
        }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Patient dashboard error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch patient dashboard data'
    });
  }
};

// Get practitioner dashboard data
const getPractitionerDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Mock data for practitioner dashboard
    const dashboardData = {
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role
      },
      todaysSchedule: [
        {
          id: 1,
          patientName: "Asha Patel",
          treatment: "Abhyanga Therapy",
          time: "09:00 AM",
          status: "upcoming",
          room: "Room 2"
        },
        {
          id: 2,
          patientName: "Raj Kumar",
          treatment: "Consultation",
          time: "10:30 AM",
          status: "upcoming",
          room: "Room 1"
        },
        {
          id: 3,
          patientName: "Meera Singh",
          treatment: "Shirodhara",
          time: "02:00 PM",
          status: "upcoming",
          room: "Room 3"
        }
      ],
      patientQueue: {
        waiting: 3,
        averageWaitTime: "8 minutes",
        nextPatient: "Priya Sharma",
        nextRoom: "Room 2"
      },
      todaysStats: {
        patientsSeen: 12,
        treatmentsCompleted: 8,
        averageSessionTime: "45 min"
      },
      aiInsights: [
        {
          id: 1,
          type: "treatment_effectiveness",
          title: "Treatment Effectiveness",
          description: "Your Abhyanga treatments show 23% better outcomes this month. Consider extending session duration for Vata patients.",
          category: "performance"
        },
        {
          id: 2,
          type: "schedule_optimization",
          title: "Schedule Optimization",
          description: "Moving consultation slots to afternoon could reduce patient wait times by 15 minutes on average.",
          category: "efficiency"
        }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Practitioner dashboard error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch practitioner dashboard data'
    });
  }
};

// Get admin dashboard data
const getAdminDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Mock data for admin dashboard
    const dashboardData = {
      user: {
        id: req.user._id,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role
      },
      keyMetrics: {
        totalPatients: 1247,
        revenue: "₹2.4M",
        averageWaitTime: "8 min",
        satisfaction: "4.7/5"
      },
      resourceUtilization: {
        treatmentRooms: 85,
        practitioners: 92,
        equipment: 78
      },
      recentActivity: [
        {
          id: 1,
          type: "new_patient",
          message: "New patient registered",
          details: "Priya Sharma",
          timestamp: "2 hours ago"
        },
        {
          id: 2,
          type: "treatment_completed",
          message: "Treatment completed",
          details: "Abhyanga session",
          timestamp: "3 hours ago"
        },
        {
          id: 3,
          type: "appointment_scheduled",
          message: "Appointment scheduled",
          details: "Raj Kumar",
          timestamp: "5 hours ago"
        },
        {
          id: 4,
          type: "payment_received",
          message: "Payment received",
          details: "₹2,500",
          timestamp: "6 hours ago"
        }
      ],
      aiAnalytics: [
        {
          id: 1,
          type: "efficiency_optimization",
          title: "Efficiency Optimization",
          description: "AI scheduling has improved resource utilization by 28% and reduced patient wait times by 40%.",
          category: "performance"
        },
        {
          id: 2,
          type: "treatment_success",
          title: "Treatment Success",
          description: "Personalized treatment plans show 35% better patient outcomes compared to standard protocols.",
          category: "outcomes"
        },
        {
          id: 3,
          type: "predictive_analytics",
          title: "Predictive Analytics",
          description: "Early intervention alerts have prevented 12 potential complications this month.",
          category: "prevention"
        }
      ]
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch admin dashboard data'
    });
  }
};

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    // Mock analytics data
    const analyticsData = {
      patientGrowth: {
        current: 1247,
        previous: 1100,
        growth: 13.4
      },
      revenue: {
        current: 2400000,
        previous: 2000000,
        growth: 20
      },
      satisfaction: {
        current: 4.7,
        previous: 4.4,
        growth: 6.8
      },
      waitTime: {
        current: 8,
        previous: 13,
        improvement: 38.5
      },
      monthlyTrends: [
        { month: "Jan", patients: 1200, revenue: 2200000 },
        { month: "Feb", patients: 1250, revenue: 2300000 },
        { month: "Mar", patients: 1300, revenue: 2400000 },
        { month: "Apr", patients: 1247, revenue: 2400000 }
      ]
    };

    res.json({
      success: true,
      data: analyticsData
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      error: 'Server error',
      message: 'Failed to fetch analytics data'
    });
  }
};

module.exports = {
  getPatientDashboard,
  getPractitionerDashboard,
  getAdminDashboard,
  getAnalytics
};
