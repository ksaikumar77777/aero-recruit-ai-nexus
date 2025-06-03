export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_bias_detection: {
        Row: {
          ai_explanation: string | null
          bias_categories: string[] | null
          bias_flags: Json | null
          candidate_id: string
          corrective_recommendations: string | null
          detected_at: string | null
          flagged_phrases: Json | null
          hr_response: string | null
          hr_user_id: string
          id: string
          original_content: string
          reviewed_by_hr: boolean | null
          severity_level: Database["public"]["Enums"]["severity_level"]
          source_id: string
          source_type: Database["public"]["Enums"]["bias_source"]
          suggested_alternatives: string[] | null
        }
        Insert: {
          ai_explanation?: string | null
          bias_categories?: string[] | null
          bias_flags?: Json | null
          candidate_id: string
          corrective_recommendations?: string | null
          detected_at?: string | null
          flagged_phrases?: Json | null
          hr_response?: string | null
          hr_user_id: string
          id?: string
          original_content: string
          reviewed_by_hr?: boolean | null
          severity_level: Database["public"]["Enums"]["severity_level"]
          source_id: string
          source_type: Database["public"]["Enums"]["bias_source"]
          suggested_alternatives?: string[] | null
        }
        Update: {
          ai_explanation?: string | null
          bias_categories?: string[] | null
          bias_flags?: Json | null
          candidate_id?: string
          corrective_recommendations?: string | null
          detected_at?: string | null
          flagged_phrases?: Json | null
          hr_response?: string | null
          hr_user_id?: string
          id?: string
          original_content?: string
          reviewed_by_hr?: boolean | null
          severity_level?: Database["public"]["Enums"]["severity_level"]
          source_id?: string
          source_type?: Database["public"]["Enums"]["bias_source"]
          suggested_alternatives?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_bias_detection_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_chat_analysis: {
        Row: {
          ai_recommendation: string | null
          candidate_id: string
          chat_transcript: Json
          confidence_score: number | null
          extracted_availability: Json | null
          id: string
          interest_level: Database["public"]["Enums"]["interest_level"] | null
          job_id: string
          key_concerns: string[] | null
          location_preferences: string[] | null
          notice_period_discussed: string | null
          positive_indicators: string[] | null
          processed_at: string | null
          red_flags: string[] | null
          salary_expectations: Json | null
          work_arrangement_preferences: string[] | null
        }
        Insert: {
          ai_recommendation?: string | null
          candidate_id: string
          chat_transcript: Json
          confidence_score?: number | null
          extracted_availability?: Json | null
          id?: string
          interest_level?: Database["public"]["Enums"]["interest_level"] | null
          job_id: string
          key_concerns?: string[] | null
          location_preferences?: string[] | null
          notice_period_discussed?: string | null
          positive_indicators?: string[] | null
          processed_at?: string | null
          red_flags?: string[] | null
          salary_expectations?: Json | null
          work_arrangement_preferences?: string[] | null
        }
        Update: {
          ai_recommendation?: string | null
          candidate_id?: string
          chat_transcript?: Json
          confidence_score?: number | null
          extracted_availability?: Json | null
          id?: string
          interest_level?: Database["public"]["Enums"]["interest_level"] | null
          job_id?: string
          key_concerns?: string[] | null
          location_preferences?: string[] | null
          notice_period_discussed?: string | null
          positive_indicators?: string[] | null
          processed_at?: string | null
          red_flags?: string[] | null
          salary_expectations?: Json | null
          work_arrangement_preferences?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_analysis_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_chat_analysis_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_interview_summaries: {
        Row: {
          ai_generated_summary: string | null
          areas_for_improvement: string[] | null
          audio_transcript: string | null
          bias_flags: Json | null
          candidate_id: string
          communication_score: number | null
          cultural_fit_score: number | null
          id: string
          interview_date: string
          interview_type: Database["public"]["Enums"]["interview_type"]
          interviewer_id: string
          key_strengths: string[] | null
          overall_rating: number | null
          processed_at: string | null
          raw_feedback: string | null
          recommended_next_steps: string | null
          technical_score: number | null
        }
        Insert: {
          ai_generated_summary?: string | null
          areas_for_improvement?: string[] | null
          audio_transcript?: string | null
          bias_flags?: Json | null
          candidate_id: string
          communication_score?: number | null
          cultural_fit_score?: number | null
          id?: string
          interview_date: string
          interview_type: Database["public"]["Enums"]["interview_type"]
          interviewer_id: string
          key_strengths?: string[] | null
          overall_rating?: number | null
          processed_at?: string | null
          raw_feedback?: string | null
          recommended_next_steps?: string | null
          technical_score?: number | null
        }
        Update: {
          ai_generated_summary?: string | null
          areas_for_improvement?: string[] | null
          audio_transcript?: string | null
          bias_flags?: Json | null
          candidate_id?: string
          communication_score?: number | null
          cultural_fit_score?: number | null
          id?: string
          interview_date?: string
          interview_type?: Database["public"]["Enums"]["interview_type"]
          interviewer_id?: string
          key_strengths?: string[] | null
          overall_rating?: number | null
          processed_at?: string | null
          raw_feedback?: string | null
          recommended_next_steps?: string | null
          technical_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_interview_summaries_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_resume_analysis: {
        Row: {
          ai_summary: string | null
          candidate_id: string
          education_match: Json | null
          experience_match: Json | null
          id: string
          job_description: string
          job_id: string
          keyword_matches: Json | null
          match_score: number | null
          processed_at: string | null
          processing_time_ms: number | null
          recommendations: string | null
          resume_url: string
          skill_matches: Json | null
          strengths: string[] | null
          weaknesses: string[] | null
        }
        Insert: {
          ai_summary?: string | null
          candidate_id: string
          education_match?: Json | null
          experience_match?: Json | null
          id?: string
          job_description: string
          job_id: string
          keyword_matches?: Json | null
          match_score?: number | null
          processed_at?: string | null
          processing_time_ms?: number | null
          recommendations?: string | null
          resume_url: string
          skill_matches?: Json | null
          strengths?: string[] | null
          weaknesses?: string[] | null
        }
        Update: {
          ai_summary?: string | null
          candidate_id?: string
          education_match?: Json | null
          experience_match?: Json | null
          id?: string
          job_description?: string
          job_id?: string
          keyword_matches?: Json | null
          match_score?: number | null
          processed_at?: string | null
          processing_time_ms?: number | null
          recommendations?: string | null
          resume_url?: string
          skill_matches?: Json | null
          strengths?: string[] | null
          weaknesses?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_resume_analysis_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_resume_analysis_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      candidates: {
        Row: {
          application_answers: Json | null
          applied_at: string | null
          candidate_id: string
          cover_letter: string | null
          final_salary_offered: number | null
          hr_notes: string | null
          id: string
          interview_scheduled: boolean | null
          job_id: string
          placement_date: string | null
          rating: number | null
          resume_url: string
          status: Database["public"]["Enums"]["application_status"] | null
          status_updated_at: string | null
          status_updated_by: string | null
        }
        Insert: {
          application_answers?: Json | null
          applied_at?: string | null
          candidate_id: string
          cover_letter?: string | null
          final_salary_offered?: number | null
          hr_notes?: string | null
          id?: string
          interview_scheduled?: boolean | null
          job_id: string
          placement_date?: string | null
          rating?: number | null
          resume_url: string
          status?: Database["public"]["Enums"]["application_status"] | null
          status_updated_at?: string | null
          status_updated_by?: string | null
        }
        Update: {
          application_answers?: Json | null
          applied_at?: string | null
          candidate_id?: string
          cover_letter?: string | null
          final_salary_offered?: number | null
          hr_notes?: string | null
          id?: string
          interview_scheduled?: boolean | null
          job_id?: string
          placement_date?: string | null
          rating?: number | null
          resume_url?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          status_updated_at?: string | null
          status_updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      hr_profiles: {
        Row: {
          company_description: string | null
          company_logo_url: string | null
          company_name: string
          company_size: string | null
          company_website: string | null
          created_at: string | null
          department: string | null
          hiring_authority_level: string | null
          id: string
          industry: string | null
          location: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_description?: string | null
          company_logo_url?: string | null
          company_name: string
          company_size?: string | null
          company_website?: string | null
          created_at?: string | null
          department?: string | null
          hiring_authority_level?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_description?: string | null
          company_logo_url?: string | null
          company_name?: string
          company_size?: string | null
          company_website?: string | null
          created_at?: string | null
          department?: string | null
          hiring_authority_level?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      interviews: {
        Row: {
          agenda: string | null
          candidate_id: string
          created_at: string | null
          duration_minutes: number | null
          id: string
          interview_mode: Database["public"]["Enums"]["interview_mode"]
          interview_round: number | null
          interview_type: Database["public"]["Enums"]["interview_round_type"]
          interviewer_id: string
          location: string | null
          meeting_link: string | null
          next_steps: string | null
          overall_rating: number | null
          raw_feedback: string | null
          recommendation:
            | Database["public"]["Enums"]["recommendation_type"]
            | null
          scheduled_at: string
          status: Database["public"]["Enums"]["interview_status"] | null
          structured_feedback: Json | null
          updated_at: string | null
        }
        Insert: {
          agenda?: string | null
          candidate_id: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          interview_mode: Database["public"]["Enums"]["interview_mode"]
          interview_round?: number | null
          interview_type: Database["public"]["Enums"]["interview_round_type"]
          interviewer_id: string
          location?: string | null
          meeting_link?: string | null
          next_steps?: string | null
          overall_rating?: number | null
          raw_feedback?: string | null
          recommendation?:
            | Database["public"]["Enums"]["recommendation_type"]
            | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["interview_status"] | null
          structured_feedback?: Json | null
          updated_at?: string | null
        }
        Update: {
          agenda?: string | null
          candidate_id?: string
          created_at?: string | null
          duration_minutes?: number | null
          id?: string
          interview_mode?: Database["public"]["Enums"]["interview_mode"]
          interview_round?: number | null
          interview_type?: Database["public"]["Enums"]["interview_round_type"]
          interviewer_id?: string
          location?: string | null
          meeting_link?: string | null
          next_steps?: string | null
          overall_rating?: number | null
          raw_feedback?: string | null
          recommendation?:
            | Database["public"]["Enums"]["recommendation_type"]
            | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["interview_status"] | null
          structured_feedback?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      job_analytics: {
        Row: {
          applications_count: number | null
          avg_time_on_page: number | null
          bounce_rate: number | null
          conversion_rate: number | null
          date: string
          id: string
          job_id: string
          saves_count: number | null
          share_count: number | null
          views_count: number | null
        }
        Insert: {
          applications_count?: number | null
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          date: string
          id?: string
          job_id: string
          saves_count?: number | null
          share_count?: number | null
          views_count?: number | null
        }
        Update: {
          applications_count?: number | null
          avg_time_on_page?: number | null
          bounce_rate?: number | null
          conversion_rate?: number | null
          date?: string
          id?: string
          job_id?: string
          saves_count?: number | null
          share_count?: number | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_analytics_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          application_count: number | null
          application_deadline: string | null
          benefits: string | null
          company_name: string
          created_at: string | null
          created_by: string
          description: string
          experience_level: Database["public"]["Enums"]["experience_level"]
          id: string
          is_active: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location: string | null
          posted_at: string | null
          remote_allowed: boolean | null
          requirements: string | null
          responsibilities: string | null
          salary_max: number | null
          salary_min: number | null
          title: string
          updated_at: string | null
          views_count: number | null
        }
        Insert: {
          application_count?: number | null
          application_deadline?: string | null
          benefits?: string | null
          company_name: string
          created_at?: string | null
          created_by: string
          description: string
          experience_level: Database["public"]["Enums"]["experience_level"]
          id?: string
          is_active?: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location?: string | null
          posted_at?: string | null
          remote_allowed?: boolean | null
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title: string
          updated_at?: string | null
          views_count?: number | null
        }
        Update: {
          application_count?: number | null
          application_deadline?: string | null
          benefits?: string | null
          company_name?: string
          created_at?: string | null
          created_by?: string
          description?: string
          experience_level?: Database["public"]["Enums"]["experience_level"]
          id?: string
          is_active?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string | null
          posted_at?: string | null
          remote_allowed?: boolean | null
          requirements?: string | null
          responsibilities?: string | null
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string | null
          views_count?: number | null
        }
        Relationships: []
      }
      job_seekers: {
        Row: {
          application_preferences: Json | null
          availability: string | null
          bio: string | null
          chat_transcript: Json | null
          created_at: string | null
          current_salary: number | null
          education: Json | null
          expected_salary: number | null
          experience_years: number | null
          id: string
          linkedin_url: string | null
          location: string | null
          notice_period: string | null
          portfolio_url: string | null
          preferred_job_type: Database["public"]["Enums"]["job_type"] | null
          resume_url: string | null
          skills: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          application_preferences?: Json | null
          availability?: string | null
          bio?: string | null
          chat_transcript?: Json | null
          created_at?: string | null
          current_salary?: number | null
          education?: Json | null
          expected_salary?: number | null
          experience_years?: number | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          notice_period?: string | null
          portfolio_url?: string | null
          preferred_job_type?: Database["public"]["Enums"]["job_type"] | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          application_preferences?: Json | null
          availability?: string | null
          bio?: string | null
          chat_transcript?: Json | null
          created_at?: string | null
          current_salary?: number | null
          education?: Json | null
          expected_salary?: number | null
          experience_years?: number | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          notice_period?: string | null
          portfolio_url?: string | null
          preferred_job_type?: Database["public"]["Enums"]["job_type"] | null
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachments: Json | null
          candidate_id: string | null
          id: string
          is_read: boolean | null
          message_body: string
          message_type: Database["public"]["Enums"]["message_type"] | null
          read_at: string | null
          recipient_id: string
          sender_id: string
          sent_at: string | null
          subject: string | null
        }
        Insert: {
          attachments?: Json | null
          candidate_id?: string | null
          id?: string
          is_read?: boolean | null
          message_body: string
          message_type?: Database["public"]["Enums"]["message_type"] | null
          read_at?: string | null
          recipient_id: string
          sender_id: string
          sent_at?: string | null
          subject?: string | null
        }
        Update: {
          attachments?: Json | null
          candidate_id?: string | null
          id?: string
          is_read?: boolean | null
          message_body?: string
          message_type?: Database["public"]["Enums"]["message_type"] | null
          read_at?: string | null
          recipient_id?: string
          sender_id?: string
          sent_at?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          priority: Database["public"]["Enums"]["priority_level"] | null
          related_entity_id: string | null
          related_entity_type: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          user_id: string
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          priority?: Database["public"]["Enums"]["priority_level"] | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          first_name: string
          id: string
          is_active: boolean | null
          last_login: string | null
          last_name: string
          phone: string | null
          profile_picture_url: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          first_name: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name: string
          phone?: string | null
          profile_picture_url?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          first_name?: string
          id?: string
          is_active?: boolean | null
          last_login?: string | null
          last_name?: string
          phone?: string | null
          profile_picture_url?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      recruitment_metrics: {
        Row: {
          applications_reviewed: number | null
          avg_time_to_hire: number | null
          candidates_shortlisted: number | null
          cost_per_hire: number | null
          hr_user_id: string
          id: string
          interviews_conducted: number | null
          job_id: string | null
          metric_date: string
          offers_made: number | null
          placements_completed: number | null
          total_applications: number | null
        }
        Insert: {
          applications_reviewed?: number | null
          avg_time_to_hire?: number | null
          candidates_shortlisted?: number | null
          cost_per_hire?: number | null
          hr_user_id: string
          id?: string
          interviews_conducted?: number | null
          job_id?: string | null
          metric_date: string
          offers_made?: number | null
          placements_completed?: number | null
          total_applications?: number | null
        }
        Update: {
          applications_reviewed?: number | null
          avg_time_to_hire?: number | null
          candidates_shortlisted?: number | null
          cost_per_hire?: number | null
          hr_user_id?: string
          id?: string
          interviews_conducted?: number | null
          job_id?: string | null
          metric_date?: string
          offers_made?: number | null
          placements_completed?: number | null
          total_applications?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recruitment_metrics_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_jobs: {
        Row: {
          id: string
          job_id: string
          saved_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          job_id: string
          saved_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          job_id?: string
          saved_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_activity_logs: {
        Row: {
          action: string
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: unknown | null
          metadata: Json | null
          session_id: string | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status:
        | "applied"
        | "reviewing"
        | "shortlisted"
        | "interviewed"
        | "selected"
        | "rejected"
        | "placed"
        | "withdrawn"
      bias_source:
        | "interview_feedback"
        | "resume_review"
        | "candidate_notes"
        | "hiring_decision"
      experience_level: "entry" | "mid" | "senior" | "executive"
      interest_level: "very_high" | "high" | "medium" | "low" | "very_low"
      interview_mode: "phone" | "video" | "in_person"
      interview_round_type:
        | "screening"
        | "technical"
        | "behavioral"
        | "final"
        | "panel"
      interview_status:
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
        | "rescheduled"
      interview_type:
        | "phone"
        | "video"
        | "in_person"
        | "technical"
        | "behavioral"
      job_type: "full_time" | "part_time" | "contract" | "internship"
      message_type:
        | "application_update"
        | "interview_invite"
        | "general"
        | "ai_insight"
      notification_type:
        | "application"
        | "interview"
        | "job_update"
        | "ai_analysis"
        | "bias_alert"
        | "system"
      priority_level: "low" | "medium" | "high" | "urgent"
      recommendation_type:
        | "strong_hire"
        | "hire"
        | "maybe"
        | "no_hire"
        | "strong_no_hire"
      severity_level: "low" | "medium" | "high" | "critical"
      user_role: "job_seeker" | "hr"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: [
        "applied",
        "reviewing",
        "shortlisted",
        "interviewed",
        "selected",
        "rejected",
        "placed",
        "withdrawn",
      ],
      bias_source: [
        "interview_feedback",
        "resume_review",
        "candidate_notes",
        "hiring_decision",
      ],
      experience_level: ["entry", "mid", "senior", "executive"],
      interest_level: ["very_high", "high", "medium", "low", "very_low"],
      interview_mode: ["phone", "video", "in_person"],
      interview_round_type: [
        "screening",
        "technical",
        "behavioral",
        "final",
        "panel",
      ],
      interview_status: [
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
        "rescheduled",
      ],
      interview_type: [
        "phone",
        "video",
        "in_person",
        "technical",
        "behavioral",
      ],
      job_type: ["full_time", "part_time", "contract", "internship"],
      message_type: [
        "application_update",
        "interview_invite",
        "general",
        "ai_insight",
      ],
      notification_type: [
        "application",
        "interview",
        "job_update",
        "ai_analysis",
        "bias_alert",
        "system",
      ],
      priority_level: ["low", "medium", "high", "urgent"],
      recommendation_type: [
        "strong_hire",
        "hire",
        "maybe",
        "no_hire",
        "strong_no_hire",
      ],
      severity_level: ["low", "medium", "high", "critical"],
      user_role: ["job_seeker", "hr"],
    },
  },
} as const
